import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/submit/:formUrl'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
