import { User } from "@/types/general.types"

import { userStatus, userTypes } from "./enum"

/**
 * Given a user object, determine the correct redirect url based on the
 * user's status and type.
 *
 * If the user is not active, redirect to the verify page. Otherwise,
 * redirect to the appropriate dashboard based on the user's type.
 *
 * @param  user - The user object to determine the redirect URL for
 * @return  The URL to redirect to
 */
export const getRedirectUrl = ({ userType, status }: User) => {
   // Check status first - redirect to verify if not active
   if (status !== userStatus.ACTIVE) {
      // return authRoutes.verify
   }

   // Redirect based on user type
   switch (userType) {
      case userTypes.ORGANIZATION:
         return `${process.env.NEXT_PUBLIC_ADMIN_APP}/dashboard`
      case userTypes.STAFF:
         return `${process.env.NEXT_PUBLIC_STAFF_APP}/dashboard`
   }
}
