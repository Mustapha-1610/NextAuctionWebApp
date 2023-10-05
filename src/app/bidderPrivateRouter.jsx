"use client";
import { getServerSideProps } from "next/server";
import { useSelector } from "react-redux";

export async function getServerSideProps(context) {
  // Get the bidder data from the redux global state
  const bidderData = useSelector((state) => state?.bidderData?.bidderInfo);

  // If the bidder data does not exist, redirect the user to the home page
  if (bidderData === null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // The bidder data exists, so the user can access the route
  return {
    props: {},
  };
}

const PrivateRoute = ({ children }) => {
  return children;
};

export default PrivateRoute;
