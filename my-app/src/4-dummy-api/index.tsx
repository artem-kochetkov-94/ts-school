import { useEffect, useState } from "react";
import axios from "axios";
import { IUserResponse, HTTPRequestStatus, isSuccessUserData } from "./types";

async function getUsers(): Promise<IUserResponse | void> {
  try {
    const { data, status } = await axios.get<IUserResponse>(
      "https://dummyjson.com/users"
    );

    if (status !== HTTPRequestStatus.OK) {
      throw new Error("Failed request");
    }

    if (isSuccessUserData(data)) {
      return data;
    }

    throw Error("Incorrect data");
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      console.log("Network error: ", error.message);
    } else if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

export const Users: React.FC = () => {
  const [data, setData] = useState<IUserResponse | null>(null);

  useEffect(() => {
    async function getData(): Promise<void> {
      const data = await getUsers();

      if (isSuccessUserData(data)) {
        setData(data);
      } else {
        setData(null);
      }
    }

    getData();
  }, []);

  return (
    <div>
      {data
        ? data.users.map((user) => (
            <div key={user.id}>
              {user.firstName} {user.lastName}
            </div>
          ))
        : "not data"}
    </div>
  );
};
