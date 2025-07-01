
import React from 'react';

interface ClientChallengeSectionProps {
  clientBackground: string;
  challenge: string;
}

/**
 * ClientChallengeSection - Displays client background and challenge
 * 
 * This component presents the context of the client's situation and
 * the specific challenge they faced, setting up the problem that was solved.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Clear content organization
 */
const ClientChallengeSection = ({ clientBackground, challenge }: ClientChallengeSectionProps) => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50" aria-labelledby="client-challenge-title">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-12">
          <h2 
            id="client-challenge-title"
            className="text-2xl md:text-3xl font-bold mb-6 dark:text-white"
          >
            Client Challenge
          </h2>
          
          <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-600 mb-8">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Client Background</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-lg leading-relaxed">
              {clientBackground}
            </p>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 shadow-sm border border-red-100 dark:border-red-900/30">
            <h3 className="text-lg font-semibold mb-4 text-red-700 dark:text-red-300">The Challenge</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-lg leading-relaxed">
              {challenge}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientChallengeSection;
