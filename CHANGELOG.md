# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to Semantic Versioning.

## [Unreleased]

### Added
- **Seamless Marketplace-Forum Integration:** Implemented a new feature that allows users to discuss merchandise items in the forum. A "Discuss" button on the product page now automatically creates a dedicated, pre-populated forum thread if one doesn't exist, and navigates the user directly to it.

### Fixed
- **Application Crash:** Restored the main `App.tsx` component, which was previously incomplete, fixing a critical `SyntaxError` that prevented the application from loading.

## [3.0.0] - 2024-08-03

### Added
- **3D Merchandise Details & Reviews:** Implemented an interactive 3D dialog for merchandise items. The front displays product details, and the back features a full-stack customer review system where users can read and submit reviews.
- **Community Goal on Homepage:** The Community Recycling Goal from the Safa Recycle Hub is now displayed on the homepage for better visibility.
- **Image Enhancement:** Added a non-AI, client-side image enhancement feature. Users can now click an "Enhance Image" button when uploading photos to improve contrast and brightness, with an option to revert to the original.
- **Top Discussions on Homepage:** Added a new section to the homepage that showcases the three most popular posts from the community forum, linking directly to the discussion threads.
- **Visual Supply Points List:** The "Nearby Supply Points" list on the Supplies page has been updated to display an image for each location, creating a more visually appealing and informative interface.
- **Merchandise CRUD:** Implemented full Create, Read, Update, and Delete functionality for merchandise items within the Admin Panel.
- **Interactive Landing Page:** Created a new, dynamic, and animated landing page for unregistered users, featuring scroll-triggered animations, live community stats, a "How It Works" guide, and an animated icon background. This replaces the previous static welcome screen.
- **Full-Stack Hero Slider:** Added an animated, interactive hero slider to the Rewards page, with full CRUD management available to administrators in the Admin Panel.
- **Sticky Action Header:** Implemented a new context-aware sticky header on the Home Page that provides persistent access to primary actions, replacing the global floating action button.
- **Featured Rewards on Homepage:** Added a new interactive "Featured Rewards" carousel to the homepage to showcase "Gold" tier marketplace items.
- **Official Merchandise Store:** Added a new "Official Merchandise" section to the Rewards page for direct cash purchases via QR code, complete with receipt generation and tracking.
- **Vendor Tier System:** Implemented a `Gold`, `Silver`, `Bronze` tier system for marketplace vendors, manageable by admins and featuring prominent "Featured" styling for `Gold` tier items.
- **Username on Receipts:** The user's name is now included directly on the digital purchase receipt for better clarity.

### Changed
- **Homepage Layout:** Moved the "Mayor's Challenge" banner to the top of the homepage for better visibility.
- **Purchase Approval Workflow:** Implemented a new system for admin confirmation of cash-related marketplace purchases, including "Pending" statuses on receipts, an admin approval UI, and user notifications upon confirmation. Safa Points are now only deducted after an admin approves a transaction.
- **Live Activity Feed Layout:** Changed the feed on the homepage from a horizontal carousel back to a vertical list for improved readability.
- **Interactive Live Activity Feed:** Redesigned the live activity feed into an interactive, content-linked component.

### Fixed
- **Admin Panel Crash:** Restored the `AdminPage.tsx` file which was previously incomplete, fixing a critical syntax error that prevented the page from loading.
- **UI & Animation Bugs:**
  - Fixed a broken icon on the public landing page.
  - Resolved an issue where the landing page's animated background was not visible.
  - Corrected a bug where the issue detail modal was positioned incorrectly and cut off on small screens.

### Removed
- **Global Floating Action Menu:** Removed the global floating "+" button and its associated menu, replacing its functionality with the new sticky header on the homepage.
- **Static Welcome Page:** Removed the old, static welcome page for unregistered users.

## [6.7.0] - 2024-08-02

### Added
- **Visual Role Distinction:** Implemented distinct visual styles for administrators across the application. Admin users now have a colored username and a special badge in the Community Forum, profile page, and Admin Panel to make them easily identifiable.

## [6.6.0] - 2024-08-01

### Changed
- **Comprehensive UI Polish:** Conducted a major visual overhaul to improve aesthetics and user experience.
- **Visuals:** Updated the app with a cleaner background, softer shadows, and more consistent spacing.
- **Header:** The main header now uses a modern "glassmorphism" (frosted glass) effect.
- **Animations:** All modals now slide in smoothly from the bottom, and other subtle animations have been added.
- **Component Redesign:**
  - **Home Page:** Statistics cards and issue cards have been redesigned for better readability.
  - **Leaderboards:** The top 3 users and wards are now celebrated with vibrant gold, silver, and bronze gradient backgrounds and medal icons.
  - **Profile Page:** The activity feed now has a cleaner, timeline-inspired look.
  - **Digital Receipts:** The purchase receipt has been completely redesigned to look like a modern, professional digital invoice.

## [6.5.0] - 2024-07-31

### Added
- **Combined Payments (SP + Cash):** Users can now use their existing Safa Point balance to partially pay for a reward and cover the remaining amount with a QR cash payment.
- **Digital Purchase Receipts:** After every marketplace transaction, a unique digital receipt is now generated and displayed to the user.
- **Receipt History in Profile:** A new "Receipts" tab has been added to the user profile, providing a complete history of all purchases. Users can view any past receipt, making it easy to show proof of purchase to vendors.

## [6.4.0] - 2024-07-30

### Added
- **QR Code Payments for Rewards:** Implemented a new QR code payment system for the Rewards Marketplace. Users with insufficient Safa Points (SP) can now purchase rewards using a QR payment method (e.g., eSewa, Khalti). The "Redeem" button dynamically changes to "Pay with QR" when appropriate.

### Fixed
- **Disturbance Reporting Crash:** Resolved a critical runtime error (`ReferenceError: DisturbanceCategory is not defined`) that occurred when reporting a disturbance. Changed `DisturbanceCategory` from a `type` alias to a string `enum` to ensure it exists at runtime, making the feature functional again.

## [6.3.0] - 2024-07-29

### Changed
- **Made Safa Recycle Hub Fully Functional:** Overhauled the `RecyclePage` by replacing the static placeholder with a fully interactive map. The map now visually plots all nearby recycling centers. Implemented synchronized selection between the map pins and the list view for a seamless user experience.

## [6.2.0] - 2024-07-12

### Fixed
- **Floating Action Menu (Definitive Fix #2):** Resolved a persistent and critical bug where the sub-action buttons in the floating menu would not open their dedicated dialogs. The root cause was that child elements (icons and text) inside the buttons were intercepting click events. `pointer-events-none` has been applied to all child elements within the FAB buttons to ensure that clicks are always registered by the button itself, restoring full functionality.

## [6.1.0] - 2024-07-11

### Fixed
- **Floating Action Menu (Definitive Fix):** Resolved a persistent and critical bug where clicking actions in the floating menu would not open their dedicated dialogs. The root cause was a `z-index` conflict where all modals were attempting to render at the same layer as the FAB itself. The `z-index` of every modal in the application has been increased to ensure they always appear on top of all other UI elements, restoring full functionality to the FAB system.

## [6.0.1] - 2024-07-10

### Fixed
- **Floating Action Menu (Definitive Fix):** Resolved a persistent and critical bug where the floating action menu was unresponsive. The root cause was an incorrect `z-index` that placed the menu underneath other navigation elements, making it unclickable. The `z-index` has been corrected, restoring full functionality to the menu and all its sub-buttons across the entire application.

## [6.0.0] - 2024-07-09

### Fixed
- **Floating Action Menu (Definitive Fix):** Resolved a persistent bug where the floating action button and its sub-actions were unresponsive. The issue was caused by wrapper divs around the icons intercepting click events. The component has been refactored to remove these wrappers, restoring full functionality to the entire menu across all pages.
- **Forum UI Polish:** Updated the UI for the "Image URL" and "YouTube Link" inputs in both the "Create Thread" and "Reply" forms to match the requested design, featuring larger icons and a cleaner layout.

## [5.9.1] - 2024-07-08

### Fixed
- **Floating Action Menu:** Fixed a critical bug where the main "+" button was unresponsive. Clicks were being intercepted by the icon within the button; this has been resolved to restore full functionality to the menu and its sub-buttons.
- **Forum UI Polish:** Updated the UI for the "Image URL" and "YouTube Link" inputs in both the "Create Thread" and "Reply" forms to match the requested design, featuring larger icons and a cleaner layout.

## [5.9.0] - 2024-07-07

### Fixed
- **Floating Action Menu:** Fixed a bug where the main floating action button was not responding to clicks due to a styling conflict with its icon. The sub-menu buttons for reporting actions are now fully functional.
- **Homepage Layout:** Reduced the height of the "Live Activity Feed" component on the homepage to create a more balanced and less overwhelming layout.

## [5.8.0] - 2024-07-06

### Added
- **Global Floating Action Menu:** Implemented a new global, multi-action Floating Action Button (FAB) that is visible on all pages for logged-in users.
- Tapping the main "+" button expands to reveal quick-access buttons for "Log a Quick Action," "Report a Clean-up Issue," and "Report a Disturbance."
- The menu is context-aware and hides buttons for features that are disabled in the Admin Panel.
- This makes the app's core reporting features instantly accessible from anywhere in the app.

### Changed
- **State Management Refactor:** Lifted all reporting modal controls (for clean-up issues, disturbances, and micro-actions) to the main `App.tsx` component to support the global FAB.
- Removed the old scroll-activated FAB from `HomePage.tsx`.

## [5.7.0] - 2024-07-05

### Changed
- **Upgraded "Today's Top Heroes":** Transformed the "Top Heroes" section on the homepage into a dynamic, visually engaging showcase.
- **Glassmorphic UI:** User cards now feature a modern "glassmorphism" (frosted glass) effect.
- **Auto-Scrolling Marquee:** The list of heroes now scrolls automatically in a seamless, continuous loop, and pauses on hover for better usability.
- **Enhanced Card Design:** The user cards have been redesigned to be more visually appealing and responsive, prominently displaying user achievements.

## [5.6.0] - 2024-07-04

### Added
- **Re-introduced "Smart" Floating Action Button:** The floating action button (+) for reporting new issues has been added back to the home page.
- The button is now "smart": it is hidden by default and only appears after the user scrolls down the page, providing persistent access to the report feature without cluttering the initial UI.

## [5.5.0] - 2024-07-03

### Removed
- **Floating Action Button:** The floating action button (+) for reporting new issues has been removed from the home page.

## [5.4.0] - 2024-07-02

### Added
- **Disturbance Reporting System:** A new system for reporting public disturbances has been implemented.
- **New Floating Action Button:** A floating action button (+) now appears on the home page as the user scrolls, providing quick access to report a new issue.
- **Disturbance Heatmap:** Active disturbances are now visualized on the homepage map with a distinct warning icon, providing real-time awareness of community disruptions.
- **Admin Management:** Administrators can now view and delete disturbance reports from the Admin Panel.
- **Feature Flag:** The entire disturbance reporting feature can be enabled or disabled via a new toggle in the Admin Panel settings.

## [5.3.0] - 2024-07-01

### Added
- **Mayor & Ward Management:** Administrators can now perform full CRUD (Create, Read, Update, Delete) operations on Mayor/City profiles and Wards directly from the "Locations" tab in the Admin Panel.
- **Safety Kit Redemption:** A new system allows users to request SP reimbursement for purchasing their own clean-up kits. Users can upload a receipt, which is then reviewed by an admin.
- **Admin Approval Queue:** A new "Approvals" tab in the Admin Panel displays all pending safety kit redemption requests, allowing admins to approve or reject them.

## [5.2.0] - 2024-06-30

### Added
- **Admin Panel Live Feed Management:** Administrators can now create global announcements and delete any activity from the live feed directly within the Admin Panel.

## [5.1.0] - 2024-06-29

### Added
- **Feature Flags Management:** Implemented a new "Settings" tab in the Admin Panel that allows administrators to dynamically enable or disable major application features (e.g., Rewards, Forum, Recycle Hub) in real-time. The UI, including the bottom navigation, automatically updates to reflect these changes.

## [5.0.0] - 2024-06-28

### Added
- **Micro-Actions System:** A new feature allowing users to log small, positive civic actions (e.g., picking up litter, moving a stone from the road) for a small amount of SP.
- **Daily Limit:** Users can log up to 3 micro-actions per day.
- **Modal UI:** A new modal provides a simple, icon-based interface for logging these actions.

## [4.8.1] - 2024-06-27

### Added
- **Safa Supply Points:** A new "Supplies" page has been added, featuring an interactive map and list of partner locations where users can pick up free clean-up kits (gloves, bags).
- **Daily SP for Pick-ups:** Users can log one kit pick-up per day to earn a small SP reward.

## [4.8.0] - 2024-06-26

### Changed
- **Functional Recycle Hub:** The "Recycle" page is now fully functional.
- **Interactive Map:** An interactive map displays the locations of nearby recycling centers.
- **Center Details:** Users can see details for each center, including location, hours, and accepted materials.
- **Filtering:** Users can filter centers by the type of material they accept.
- **Recycling Log:** A new modal allows users to log their recycling drop-offs to earn SP.

## [4.7.0] - 2024-06-25

### Added
- **Embedded Media in Forum:** The Community Forum now supports embedding images and YouTube videos.
- Users can add an image URL or a YouTube link when creating a new thread or replying to a post.
- The app automatically parses YouTube links to embed the video player directly in the post.
- The UI for creating and replying has been updated with dedicated input fields for these media types.

## [4.6.0] - 2024-06-24

### Added
- **Community Forum:** A new "Forum" page has been added, allowing users to start discussions, reply to posts, and vote on content.
- **Threaded Replies:** The forum supports nested replies for organized conversations.
- **Voting System:** Users can upvote and downvote posts to highlight valuable content.
- **Admin Moderation:** The forum is integrated with the Admin Panel, though full moderation tools are pending.
- **State Management:** All forum data is saved to and loaded from `localStorage`.

## [4.5.0] - 2024-06-23

### Added
- **Civic Sense Hub:** Implemented the "Civic Sense Hub," a new educational section.
- **Learning Cards:** Features quick, easy-to-read cards on topics like waste segregation and public etiquette.
- **Interactive Quiz:** Includes a simple, one-question quiz that awards users bonus SP for answering correctly, encouraging engagement with the material.

## [4.4.0] - 2024-06-22

### Added
- **City-Specific Leaderboards:** The Leaderboards page has been enhanced to be city-specific.
- **City Selector:** Users can now filter the leaderboards by major cities (Kathmandu, Lalitpur, Dharan).
- **Mayor's Profile Card:** When a city is selected, a new card displays the profile of that city's mayor, including their photo, bio, campaign promises, and current works.
- **Admin Management:** A new "Locations" tab has been added to the Admin Panel for managing mayor profiles (CRUD functionality to be added later).

## [4.3.0] - 2024-06-21

### Added
- **Active Mayor's Challenge:** Implemented a new "Mayor's Challenge" feature.
- **Challenge Banner:** An active challenge is now prominently displayed as a banner on the homepage.
- **Visual Highlighting:** Issues located in the challenge ward are now highlighted with a special border and animation on both the map and list views to draw user attention.
- **Bonus Points:** The system is now structured to support awarding bonus points for completing challenge-related activities (point logic to be finalized).

## [4.2.0] - 2024-06-20

### Added
- **Badge System:** A new "Badges" tab has been added to the user profile.
- **Earnable Badges:** Users can now earn badges (e.g., "Tole Trailblazer," "Waste Warrior") by meeting specific criteria, such as reporting their first issue or organizing an event.
- **Visual Feedback:** Earned badges are displayed in full color, while unearned badges are grayed out, providing a clear progression system for users.

## [4.1.0] - 2024-06-19

### Added
- **Admin Transaction Log:** A new "Transactions" tab has been added to the Admin Panel.
- **Comprehensive View:** This tab provides a detailed, reverse-chronological log of every reward purchase made by any user in the system.
- **Full Receipt Access:** Administrators can click on any transaction to view the complete digital receipt for that purchase, ensuring full transparency and auditability.

