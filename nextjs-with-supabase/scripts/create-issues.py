import csv
import subprocess
import sys
import os

# --- Configuration ---
# Set to your GitHub username and repository name
GITHUB_REPO = "CoriyonArrington/nextjs-with-supabase" 
# Set to False if you want to create issues even for rows marked 'Completed' initially
SKIP_COMPLETED_STATUS = True 
# -------------------

def run_command(command_list): # <<< COLON ADDED HERE
    """Runs a command using subprocess and returns stdout, stderr, and return code."""
    try: # Now this line should be valid
        # Execute the command
        # capture_output=True captures stdout and stderr
        # text=True decodes stdout/stderr as text
        # check=False prevents raising an exception on non-zero exit codes, allowing us to capture the error
        process = subprocess.run(command_list, capture_output=True, text=True, check=False) 
        return process.stdout, process.stderr, process.returncode
    except FileNotFoundError:
        # Handle case where the command (e.g., 'gh') isn't found
        return None, f"Error: '{command_list[0]}' command not found. Make sure GitHub CLI (gh) is installed and in your PATH.", 1
    except Exception as e:
        # Catch any other unexpected exceptions during subprocess execution
        return None, f"An unexpected error occurred running command: {e}", 1

def create_github_issue(repo, title, body, labels_str, milestone_str):
    """Constructs and executes the gh issue create command."""
    # Base command using gh CLI
    command = ['gh', 'issue', 'create', '--repo', repo, '--title', title, '--body', body]

    # --- Updated Label Handling ---
    if labels_str and labels_str.strip() and labels_str.strip() != '""':
        # Clean potential surrounding quotes from CSV parsing
        cleaned_labels_str = labels_str.strip().strip('"')
        if cleaned_labels_str:
            # Split the string by comma, then strip whitespace from each label
            individual_labels = [label.strip() for label in cleaned_labels_str.split(',') if label.strip()]
            # Add each valid label using a separate --label flag
            for label in individual_labels:
                command.extend(['--label', label])
    # --- End Updated Label Handling ---

    # Add milestone if provided and valid
    if milestone_str and milestone_str.strip() and milestone_str.lower() not in ['n/a', 'backlog', '""']:
        cleaned_milestone = milestone_str.strip().strip('"')
        if cleaned_milestone:
            command.extend(['--milestone', cleaned_milestone])

    print(f"Running: {' '.join(command)}") 

    stdout, stderr, returncode = run_command(command)

    # Check if the command failed (non-zero exit code)
    if returncode != 0:
        print(f" -> FAILED: Command returned non-zero exit status {returncode}.")
        # Print stderr if available, otherwise print stdout as gh might put errors there
        if stderr:
            print(f" -> Error Output: {stderr.strip()}")
        elif stdout: 
             print(f" -> Output: {stdout.strip()}")
        return False # Indicate failure
    else:
        # Command succeeded, try to extract the URL of the created issue from stdout
        issue_url = ""
        if stdout:
            lines = stdout.strip().splitlines()
            if lines:
                # The last line of successful output from 'gh issue create' is usually the URL
                issue_url = lines[-1] 
        print(f" -> SUCCESS: Created Issue '{title}' {issue_url}")
        return True # Indicate success

def main(csv_filepath):
    """Main function to read CSV and create issues."""
    # Check if the specified CSV file exists
    if not os.path.exists(csv_filepath):
        print(f"Error: CSV file not found at '{csv_filepath}'")
        sys.exit(1) # Exit if file not found

    print(f"Processing issues for repository: {GITHUB_REPO}")
    print(f"Reading from CSV file: {csv_filepath}")
    print("============================================")

    # Initialize counters for summary
    created_count = 0
    skipped_count = 0
    failed_count = 0
    row_number = 1 # Start counting from row 2 (row 1 is header)

    try:
        # Open and read the CSV file
        with open(csv_filepath, mode='r', encoding='utf-8') as infile:
            # Use csv.DictReader to access columns by header name
            reader = csv.DictReader(infile) 
            for row in reader:
                row_number += 1
                # --- Safely access columns using .get() with a default value ---
                # This prevents errors if a column is missing in the CSV
                title = row.get('Task Title', '').strip()
                description = row.get('Task Description', '').strip()
                status = row.get('Status', '').strip()
                epic = row.get('Epic', '').strip()
                priority = row.get('Priority', '').strip()
                impact = row.get('Impact', '').strip()
                effort = row.get('Effort', '').strip()
                notes = row.get('Notes / Suggested Grouping', '').strip()
                labels = row.get('GitHub Labels (Suggested)', '').strip()
                milestone = row.get('Milestone', '').strip()
                # --- End safe access ---

                # Basic validation: Skip row if title is missing
                if not title:
                    print(f"\nSkipping row {row_number} (Malformed Row - Missing Title)")
                    skipped_count += 1
                    continue

                # Print progress indicator, truncating long titles
                print(f"\nProcessing row {row_number}: '{title[:50]}...'") 

                # Skip rows marked as 'Completed' if configured to do so
                if SKIP_COMPLETED_STATUS and status.lower() == 'completed':
                    print(f"Skipping row {row_number} (Status: Completed): '{title[:50]}...'")
                    skipped_count += 1
                    continue

                # --- Format the issue body using Markdown ---
                body_parts = [description] # Start with the main description from CSV
                body_parts.append("\n\n---") # Add a horizontal rule separator
                body_parts.append("**Details:**") # Section header
                # Add details if they exist in the CSV
                if epic: body_parts.append(f"- **Epic:** {epic}")
                if priority: body_parts.append(f"- **Priority:** {priority}")
                if status: body_parts.append(f"- **Status (at creation):** {status}")
                if impact: body_parts.append(f"- **Impact:** {impact}")
                if effort: body_parts.append(f"- **Effort:** {effort}")
                # Add notes section if notes exist
                if notes:
                    body_parts.append("\n**Notes:**")
                    body_parts.append(notes)
                
                # Join all parts into a single string for the issue body
                issue_body = "\n".join(body_parts)
                # --- End body formatting ---

                # Attempt to create the issue via the helper function
                if create_github_issue(GITHUB_REPO, title, issue_body, labels, milestone):
                    created_count += 1 # Increment success counter
                else:
                    failed_count += 1 # Increment failure counter
                    print(f"^^^ Failure occurred for row {row_number} ('{title[:50]}...')")
                    # Optional: Exit immediately on first failure
                    # sys.exit(1) 
                    # Optional: Add a small delay to potentially avoid rate limits after failures
                    # import time
                    # time.sleep(1)

    except FileNotFoundError:
        # This check is redundant due to the initial check, but good practice
        print(f"Error: CSV file not found at '{csv_filepath}'")
        sys.exit(1)
    except Exception as e:
        # Catch any other unexpected errors during file reading or processing
        print(f"\nAn error occurred during processing: {e}")
        print(f"Processing stopped at row {row_number}.")
        sys.exit(1)

    # Print summary after processing all rows
    print("\n============================================")
    print("Issue Creation Summary:")
    print(f"  Successfully Created: {created_count}")
    print(f"  Skipped (Status or Malformed Row): {skipped_count}")
    print(f"  Failed: {failed_count}")
    print("============================================")

# Standard Python entry point check
if __name__ == "__main__":
    # Check if a CSV file path was provided as a command-line argument
    if len(sys.argv) < 2:
        # Get the script name for the usage message
        script_name = os.path.basename(sys.argv[0])
        print(f"Usage: python3 {script_name} <path_to_csv_file>")
        sys.exit(1) # Exit if no CSV file is provided
    
    # Get the CSV file path from the first command-line argument
    csv_file = sys.argv[1]
    # Call the main processing function
    main(csv_file)
