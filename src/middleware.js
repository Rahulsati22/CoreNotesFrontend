// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Leave array empty to require auth everywhere, or add public paths here.
const isPublicRoute = createRouteMatcher([
  // "/public(.*)", "/api/webhooks(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect(); // correct API on current Clerk versions
  }
});

export const config = {
  // Run on all non-static routes and APIs
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
