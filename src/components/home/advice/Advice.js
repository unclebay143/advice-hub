import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BubbleLoader } from "../../layouts/loader/Loader";
import { AdviceCard } from "./AdviceCard";
import {
  fetchAdvices,
  fetchBookmarkedAdvices,
} from "./../../../redux/advice/actions/advice.actions";
import { pageUrl } from "../../constant/pageurl";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CardSkeleton } from "../../layouts/skeleton/CardSkeleton";
import { EMPTY_ADVICES } from "../../../redux/types";

export const Advice = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const { advices, bookMarked } = useSelector((state) => state.advices);
  const { user, isAuthenticated } = useAuth0();
  const [sortBy, setsortBy] = useState(id);

  // const [advices, setadvices] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setsortBy(id);
  }, [id]);

  const fetchMoreAdvice = () => {
    setLoading(true);
    dispatch(fetchAdvices(page, limit))
      .then((res) => {
        res.next ? setHasMore(true) : setHasMore(false);
        // setadvices([...advices, ...res]);
        setLoading(false);
        setPage(page + 1);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchMoreAdvice();

    sortAdvices();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchBookmarkedAdvices(user.nickname));
    }
  }, [isAuthenticated]);

  // if (advices === null) {
  //   return <BubbleLoader text={"welcome... 👋"} />;
  // }

  // if (advices?.length === 0) {
  //   return (
  //     <div className="first-contributor--alert">
  //       <p>
  //         Be the first to{" "}
  //         <Link to={pageUrl.ADVICE_FORM} className="link-to-form no-decoration">
  //           git push
  //         </Link>{" "}
  //         an advice card
  //       </p>
  //     </div>
  //   );
  // }

  console.log(sortBy, id);

  const sortAdvices = (data) => {
    if (data) {
      if (sortBy === "recent") {
        return data.sort((a, b) => {
          return b.__createdtime__ - a.__createdtime__;
        });
      }
      if (sortBy === "oldest") {
        return data.sort((a, b) => {
          return a.__createdtime__ - b.__createdtime__;
        });
      }
      if (sortBy === "upvoted") {
        return data.sort((a, b) => {
          return Number(b.upvotes.length - a.upvotes.length);
        });
      }
    }
    //  else {
    // history.push("/recent");
    // return advices.sort((a, b) => {
    //   return b.__createdtime__ - a.__createdtime__;
    // });
    // }
  };

  if (sortBy === "bookmarks" && isAuthenticated && bookMarked.length === 0) {
    return (
      <div className="advice-card no-bookmark-wrap">
        <p className="no-bookmark">No bookmark yet 😀</p>
      </div>
    );
  }

  console.log(bookMarked);

  return (
    <React.Fragment>
      <div className="advice-card">
        {advices && (
          <InfiniteScroll
            dataLength={advices.length} //This is important field to render the next data
            next={fetchMoreAdvice}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p
                style={{
                  textAlign: "center",
                  color: "#39e58c",
                  paddingTop: "3rem",
                  fontSize: "1.2rem",
                }}
              >
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Grid container spacing={4} className="advice-card-grid">
              {sortAdvices(advices).map(
                (
                  {
                    heading,
                    description,
                    __createdtime__,
                    upvotes,
                    downvotes,
                    category,
                    authorImageUrl,
                    authorUsername,
                    id,
                  },
                  index
                ) => {
                  return (
                    <AdviceCard
                      key={index}
                      heading={heading}
                      desciption={description}
                      createdTime={__createdtime__}
                      upvotes={upvotes}
                      downvotes={downvotes}
                      category={category || "Others"}
                      authorImageUrl={authorImageUrl}
                      authorUsername={authorUsername}
                      adviceId={id}
                    />
                  );
                }
              )}
              {loading && <CardSkeleton />}
            </Grid>
          </InfiniteScroll>
        )}
      </div>
    </React.Fragment>
  );
};
