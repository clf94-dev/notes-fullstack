import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "@/pages/Login/Login";
import SignUp from "@/pages/SignUp/SignUp";
import RequireAuth from "@/components/RequireAuth/RequireAuth";
import AppLayout from "@/components/AppLayout/AppLayout";
import Notes from "@/pages/Notes/Notes";
/* import NotFound from '@/pages/NotFound/NotFound';
 */

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="/notes" element={<Notes />} />
          {/*       <Route path="settings" element={<Settings />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
