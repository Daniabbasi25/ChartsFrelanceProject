import { useState } from "react";
import { useAtom } from "jotai";
import { Auth } from "aws-amplify";
import { UserState, AuthState } from "../state/atoms";

import client from "../api/apollo.config";
import { GET_USER } from "../api/queries";
import useUpload from "./useUpload";
import { formatISO } from "date-fns";

const useAuth = () => {
  const [user, setUser] = useAtom(UserState);
  const [isAuth, setAuth] = useAtom(AuthState);
  const [loading, setLoading] = useState(true);
  const { download } = useUpload();

  const getUserData = (id) => {
    client.query({
      query: GET_USER,
      variables: {
        id,
        now: formatISO(new Date())
      }
    }).then(async (res) => {
      const { assistant, avatar: avatarKey } = res.data.getUser;
      console.log(res.data);

      const {
        certificationNumber,
        birthDate,
        gender,
        communication,
        name,
        address,
        telecom,
        schedule
      } = assistant;

      const email =
        telecom.find((t) => t.system === "EMAIL")?.value || "";
      const phone =
        telecom.find((t) => t.system === "PHONE")?.value || "";

      const avatar = await download({ key: avatarKey });

      setUser({
        id,
        certificationNumber,
        birthDate,
        gender,
        communication,
        email,
        phone,
        name: name[0]?.text || "",
        address: address[0],
        avatar,
        schedule,
      });

      setAuth(true);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      console.error(err);
    });
  }

  const getAuthenticatedUser = async () => {
    setLoading(true);
    try {

      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) {
        getUserData(currentUser.attributes.sub);
      } else {
        setAuth(false);
        setLoading(false);
      }
    } catch (err) {
      setAuth(false);
      setLoading(false);
    }
  }

  const login = async ({ email, password }) => {
    setLoading(true);
    await Auth.signIn({ username: email, password })
      .then((res) => {
        getUserData(res.attributes.sub);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const logout = () => {
    Auth.signOut()
      .then(() => {
        setAuth(false);
        setUser(undefined);
      })
      .catch(err => console.error(error))
  }

  return {
    loading,
    getAuthenticatedUser,
    isAuth,
    login,
    logout,
  };
};

export default useAuth;
