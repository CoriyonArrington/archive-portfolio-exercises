## Spacing

* **Source:** Custom scale defined in `tailwind.config.ts` under `theme.extend.spacing`.
* **Methodology:** **Inside-Out Spacing**
    * **External (Between Elements):** Use **`margin`** utilities (`m-*`, `mt-*`, `mb-*`, etc.). Prefer vertical margins (`mt-*`, `mb-*`) for establishing vertical rhythm between blocks or sections.
    * **Internal (Inside Elements):** Use **`padding`** utilities (`p-*`, `pt-*`, `px-*`, etc.) to create space within component boundaries (e.g., inside buttons, cards, containers).
    * **Grid/Flex Gaps:** Use **`gap-*`** utilities (`gap-*`, `gap-x-*`, `gap-y-*`) for spacing *direct children* within `grid` or `flex` containers. This is preferred over adding margins to the children themselves.
    * **Space Between:** Use `space-x-*` / `space-y-*` utilities primarily for simple, stacked elements where applying a margin to each child (except the first) is desired. `gap` is often more flexible for complex layouts.
    * _Decision:_ Defined clear usage for margin, padding, gap, space utilities to ensure consistency.
* **Spacing Scale & Usage:**
    * The system uses a custom spacing scale based on a **4px (0.25rem)** base unit, providing granular control from 4px up to 120px.
    * This scale applies to utilities like `margin` (`m`, `mt`, `mx`...), `padding` (`p`, `py`, `pl`...), `gap`, `space-*`, `width` (`w-*`), `height` (`h-*`), `translate-*`, etc.
    * Use responsive prefixes (`sm:`, `md:`, `lg:`, etc.) to adjust spacing for different screen sizes (e.g., `p-4 md:p-6 lg:p-8`).

   ### Scale Reference

    This table maps the spacing keys defined in `tailwind.config.ts` to their corresponding pixel and rem values, along with example utility classes. This scale applies to `margin`, `padding`, `gap`, `space-*`, `width`, `height`, etc.

    | Key      | Pixels | Rem         | Example Classes                            |
    | :------- | :----- | :---------- | :----------------------------------------- |
    | `1`      | 4px    | `0.25rem`   | `p-1`, `m-1`, `gap-1`, `h-1`, `w-1`        |
    | `1.5`    | 6px    | `0.375rem`  | `p-1.5`, `m-1.5`, `gap-1.5`                |
    | `2`      | 8px    | `0.5rem`    | `p-2`, `px-2`, `my-2`, `gap-2`, `h-2`    |
    | `2.5`    | 10px   | `0.625rem`  | `p-2.5`, `m-2.5`, `gap-2.5`                |
    | `3`      | 12px   | `0.75rem`   | `p-3`, `m-3`, `gap-3`, `space-x-3`       |
    | `3.5`    | 14px   | `0.875rem`  | `p-3.5`, `m-3.5`, `gap-3.5`                |
    | `4`      | 16px   | `1rem`      | `p-4`, `py-4`, `mt-4`, `gap-4`, `space-y-4` |
    | `5`      | 20px   | `1.25rem`   | `p-5`, `m-5`, `gap-5`, `h-5`, `w-5`        |
    | `6`      | 24px   | `1.5rem`    | `p-6`, `px-6`, `mb-6`, `gap-6`, `h-6`    |
    | `7`      | 28px   | `1.75rem`   | `p-7`, `m-7`, `gap-7`                      |
    | `8`      | 32px   | `2rem`      | `p-8`, `py-8`, `mt-8`, `gap-8`, `h-8`    |
    | `9`      | 36px   | `2.25rem`   | `p-9`, `m-9`, `gap-9`                      |
    | `10`     | 40px   | `2.5rem`    | `p-10`, `m-10`, `gap-10`, `h-10`, `w-10`   |
    | `11`     | 44px   | `2.75rem`   | `p-11`, `m-11`, `gap-11`                   |
    | `12`     | 48px   | `3rem`      | `p-12`, `px-12`, `mb-12`, `gap-12`, `h-12` |
    | `14`     | 56px   | `3.5rem`    | `p-14`, `m-14`, `gap-14`                   |
    | `16`     | 64px   | `4rem`      | `p-16`, `py-16`, `mt-16`, `gap-16`, `h-16` |
    | `18`     | 72px   | `4.5rem`    | `p-18`, `m-18`, `gap-18`                   |
    | `20`     | 80px   | `5rem`      | `p-20`, `m-20`, `gap-20`, `h-20`, `w-20`   |
    | `22`     | 88px   | `5.5rem`    | `p-22`, `m-22`, `gap-22`                   |
    | `24`     | 96px   | `6rem`      | `p-24`, `py-24`, `mb-24`, `gap-24`, `h-24` |
    | `26`     | 104px  | `6.5rem`    | `p-26`, `m-26`, `gap-26`                   |
    | `28`     | 112px  | `7rem`      | `p-28`, `m-28`, `gap-28`                   |
    | `30`     | 120px  | `7.5rem`    | `p-30`, `m-30`, `gap-30`, `h-30`, `w-30`   |

    ### Usage Guidelines
    *(Keep the existing Usage Guidelines section here)*
    * **Small Scale (`1` - `4` / 4px - 16px):** Use for internal element padding...
    * **Medium Scale (`5` - `8` / 20px - 32px):** Use for component padding...
    * **Large Scale (`9` - `16` / 36px - 64px):** Use for margins between distinct UI sections...
    * **Extra-Large Scale (`18` - `30` / 72px - 120px):** Primarily use for page-level or major section *vertical* padding...

    ### Usage Guidelines

    * **Small Scale (`1` - `4` / 4px - 16px):** Use for internal element padding (e.g., buttons, inputs), icon spacing, gaps between small UI elements, fine-tuning alignment.
    * **Medium Scale (`5` - `8` / 20px - 32px):** Use for component padding (e.g., cards), margins between related elements (e.g., headline and paragraph, form fields), standard grid/flex gaps.
    * **Large Scale (`9` - `16` / 36px - 64px):** Use for margins between distinct UI sections or larger components on a page, significant internal padding for sections. Often used responsively (`md:mb-12`, `lg:gap-16`).
    * **Extra-Large Scale (`18` - `30` / 72px - 120px):** Primarily use for page-level or major section *vertical* padding (`py-*`). Use sparingly for margins unless creating significant separation.