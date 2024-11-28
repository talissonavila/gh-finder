import { useState } from "react";

import Search from "../../components/Search/Search";
import User from "../../components/User/User";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import { UserProps } from "../../types/user";
import { fetchUser } from "../../api";

const Home = () => {
    const [user, setUser] = useState<UserProps | "">("");
    const [error, setError] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const loadUser = async (userName: string) => {
        setIsloading(true)
        setError(false);
        setUser("");
        try {
            const data = await fetchUser(userName);
            if (data.status === 404) {
                setError(true);
                setIsloading(false);
                return;
            }

            const { avatar_url, login, location, followers, following } = data;

            const userData: UserProps = {
                avatar_url,
                login,
                location,
                followers,
                following
            }
            setUser(userData);
            setIsloading(false)
        } catch (error) {
            console.error("Error to load user - ", error);
        }


    }

    return (
        <div>
            <Search loadUser={loadUser} />
            {isLoading && <Loader />}
            {user && <User {...user} />}
            {error && <Error />}
        </div>
    )
}

export default Home;
