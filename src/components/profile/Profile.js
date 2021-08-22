import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { fetchUserProfile } from "../../redux/advice/actions/advice.actions";
import { BubbleLoader } from "../layouts/loader/Loader";
import "./profile.css";

import plantAdvice from "./first-advice.svg";
import nothingToshow2 from "./empty1.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { Add, PlusOne } from "@material-ui/icons";
import { pageUrl } from "../constant/pageurl";
import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import {
  BASE_URL,
  USER_ADVICES_URL,
} from "../../redux/advice/service/root-endpoints";
import axios from "axios";
import { AdviceCard } from "../home/advice/AdviceCard";
import { CardSkeleton } from "../layouts/skeleton/CardSkeleton";

export const Profile = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(null);
  const [userData, setUserData] = useState(null);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [userAdvices, setUserAdvices] = useState([]);
  const [isFetchingAdvice, setIsFetching] = useState(true);

  // check if the logged in user has zero post
  const youHaveZeroPost =
    isAuthenticated &&
    userAdvices.length === 0 &&
    userData?.nickname === user?.nickname;

  // check if the user been searched has zero post
  const hasZeroPost = !isFetchingAdvice && userAdvices.length === 0;

  useEffect(() => {
    setUserName(id);
  }, [id]);

  useEffect(() => {
    if (userName) {
      dispatch(fetchUserProfile(userName)).then((res) => {
        setUserData(res.data);
      });
    }
  }, [userName, dispatch]);

  // Fetch user advice
  useEffect(() => {
    const fetchUserAdvices = async () => {
      setIsFetching(true);
      const payload = {
        username: userData[0].nickname,
      };
      const { data } = await axios.post(BASE_URL + USER_ADVICES_URL, payload);
      setIsFetching(false);
      setUserAdvices(data.data);
    };

    if (userData) {
      fetchUserAdvices();
    }
  }, [userData]);

  // Loading
  if (!userData) {
    return <BubbleLoader />;
  }

  const { picture, nickname, name } = userData.length > 0 && userData[0];
  return (
    <>
      <section className="user-profile">
        {/* header */}
        <section className="profile-header">
          <div className="user-profile--img">
            <img
              src={picture}
              loading="lazy"
              alt={nickname}
              data-sizes="auto"
            />
          </div>
        </section>
        {/* user profile */}
        <section className="user-profile--information">
          <h1 className="user-fullname">{name || "user not found"}</h1>
          <p className="user-name">@{nickname || "user not found"}</p>
        </section>
        {/* advice count */}
        <div className="user-advices">
          <section className="user-stat">
            <h3>Total Advice Given: </h3>
            {isFetchingAdvice ? (
              <p style={{ marginTop: "1rem", color: "#39e58c" }}>
                Fetching user advices...
              </p>
            ) : (
              <h3 className="user-stat--counter">{userAdvices.length}</h3>
            )}
          </section>
          {/* user viewing their profile */}
          {youHaveZeroPost && (
            <div className="nothing-yet-wrapper">
              <h3 className="nothing-yet">
                Reason: You haven't planted any advice yet.
                <Button className="add-btn">
                  <Add className="add-advice" /> Add
                </Button>
              </h3>
              <div className="plant-first-advice-wrapper">
                <img
                  src={plantAdvice}
                  alt="empty advice profile"
                  className="plant-first-advice"
                />
              </div>
            </div>
          )}

          {/* other user visiting a profile */}
          {hasZeroPost && (
            <div className="nothing-yet-wrapper">
              <h3 className="nothing-yet">No advice from this user yet</h3>
              <img src={nothingToshow2} alt="empty advice profile" />
            </div>
          )}
          <section>
            <div className="advice-card">
              <Grid container spacing={4} className="advice-card-grid">
                {isFetchingAdvice ? (
                  <>
                    <CardSkeleton num={4} />
                  </>
                ) : (
                  <>
                    {userAdvices?.map(
                      ({
                        heading,
                        description,
                        __createdtime__,
                        upvotes,
                        downvotes,
                        category,
                        authorImageUrl,
                        authorUsername,
                        author_id,
                        id,
                      }) => {
                        return (
                          <AdviceCard
                            key={id}
                            heading={heading}
                            desciption={description}
                            createdTime={__createdtime__}
                            upvotes={upvotes}
                            downvotes={downvotes}
                            category={category || "Others"}
                            author_id={author_id}
                            authorImageUrl={authorImageUrl}
                            authorUsername={authorUsername}
                            adviceId={id}
                            // bookMarked={bookMarkedIDs.includes(id)}
                          />
                        );
                      }
                    )}
                  </>
                )}
              </Grid>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};
