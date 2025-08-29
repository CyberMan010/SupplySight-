# Project Notes

## Decisions & Trade-offs

- **Mock Data:** Used mock data and a simple Node.js GraphQL backend for rapid prototyping. In production, data would come from a real database.
- **Apollo Client:** Chosen for its robust caching and error handling. Some advanced features (optimistic UI, subscriptions) are not implemented.
- **UI/UX:** Focused on clarity and responsiveness. Used TailwindCSS for fast styling and Recharts for simple charting.
- **TypeScript:** Strict typing throughout for reliability, but some types (e.g., API responses) could be further refined.
- **Error Handling:** Implemented error boundaries and loading skeletons for better user experience.
- **Testing:** No automated tests due to time constraints.

## Improvements with More Time

- **Backend:** Replace mock backend with a real database and authentication.
- **Testing:** Add unit, integration, and E2E tests.
- **Accessibility:** Audit and improve accessibility (ARIA, keyboard navigation).
- **Performance:** Optimize queries, pagination, and bundle size.
- **Features:** Add product CRUD, warehouse CRUD, user roles, notifications, and real-time updates.
- **Styling:** Refine design, add dark mode, and improve mobile experience.
- **Documentation:** Expand API docs and developer guides.
