import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { AppRouter } from "services/router.trpc";
import "styles/globals.css";

const getBaseUrl = () => {
  if (process.browser) return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
};

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    // const url = process.env.VERCEL_URL
    //   ? `https://${process.env.VERCEL_URL}/api/trpc`
    //   : "http://localhost:3000/api/trpc";

    const url = getBaseUrl() + "/api/trpc";

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
  // responseMeta({ clientErrors, ctx }) {
  //   if (clientErrors.length) {
  //     // propagate first http error from API calls
  //     return {
  //       status: clientErrors[0].data?.httpStatus ?? 500,
  //     };
  //   }
  //   // cache full page for 1 day + revalidate once every second
  //   const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
  //   return {
  //     "Cache-Control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
  //   };
  // },
})(MyApp);
