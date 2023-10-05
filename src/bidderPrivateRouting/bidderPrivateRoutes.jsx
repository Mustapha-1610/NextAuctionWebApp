import PrivateRoute from "./bidderPrivateRouter";

const PrivateRoutes = () => {
  return (
    <div>
      <PrivateRoute>
        <Route path="/bidder/profile" />
      </PrivateRoute>
    </div>
  );
};

export default PrivateRoutes;
