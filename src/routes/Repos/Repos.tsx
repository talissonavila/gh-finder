import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BackBtn from "../../components/Button/BackBtn";
import Repo from "../../components/Repo/Repo";
import Loader from "../../components/Loader/Loader";
import { RepoProps } from "../../types/repo";
import { fetchUserRepos } from "../../api";

import styles from "./Repos.module.css";

const Repos = () => {
    const { username } = useParams();
    const [repos, setRepos] = useState<RepoProps[] | [] | "">("");
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        const loadRepos = async function (username: string) {
            setIsloading(true);
            try {
                const data = await fetchUserRepos(username);
                if (data.status === 404) {
                    setIsloading(false);
                    return;
                }
                
                let orderedRepos = data.sort((a: RepoProps, b: RepoProps) => b.stargazers_count - a.stargazers_count);
                orderedRepos = orderedRepos.slice(0, 5);

                setRepos(orderedRepos);
                setIsloading(false);
            } catch (error) {
                console.error("Error to load user repos - ", error);
                setIsloading(false);
            }
        }
        if (username) loadRepos(username);

    }, [username]);

    if (!repos && isLoading) return <Loader />

    return (
        <div className={styles.repos}>
            <BackBtn/>
            <h2>Explore most relevant repos from {username}</h2>
            {repos && repos.length === 0 && <p>User has any repos</p>}
            {repos && repos.length > 0 && (
                <div className={styles.repos_container}>
                    {repos.map((repo: RepoProps) => (
                        <Repo key={repo.name} {...repo}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Repos;
