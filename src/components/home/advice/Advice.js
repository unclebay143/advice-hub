import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdviceCard } from "./AdviceCard";
import {
  fetchAdvices,
  fetchBookmarkedAdvices,
} from "./../../../redux/advice/actions/advice.actions";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CardSkeleton } from "../../layouts/skeleton/CardSkeleton";

export const Advice = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { advices, bookMarked } = useSelector((state) => state.advices);
  const { user, isAuthenticated } = useAuth0();
  const [sortBy, setsortBy] = useState(id);
  const bookMarkedIDs = bookMarked.map((a) => a.id);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const sortAdvices = (data) => {
    if (data) {
      if (!sortBy || sortBy === "recent") {
        // default
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
      if (sortBy === "general") {
        return data.filter((d) => d.category === "general");
      }
      if (sortBy === "web-development") {
        return data.filter((d) => d.category === "web-development");
      }
      if (sortBy === "product-management") {
        return data.filter((d) => d.category === "product-management");
      }
      if (sortBy === "ui-ux") {
        return data.filter((d) => d.category === "ui-ux");
      }
      if (sortBy === "soft-skills") {
        return data.filter((d) => d.category === "soft-skills");
      }
      if (sortBy === "bookmarks") {
        return bookMarked;
      }
    }
  };

  // Set the sort id
  useEffect(() => {
    setsortBy(id);
  }, [id]);

  // Func to fetch more advice
  const fetchMoreAdvice = () => {
    setLoading(true);
    dispatch(fetchAdvices(page, limit))
      .then((res) => {
        res.next ? setHasMore(true) : setHasMore(false);
        setLoading(false);
        setPage(page + 1);
      })
      .catch((error) => console.log(error));
  };

  //
  useEffect(() => {
    fetchMoreAdvice();
    sortAdvices();
  }, []);

  // Fetch bookmarked advices 🔖
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchBookmarkedAdvices(user.nickname));
    }
  }, [isAuthenticated, dispatch, user]);

  // if (advices.length === 0) {
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

  if (sortBy === "bookmarks" && bookMarked.length === 0) {
    return (
      <div className="advice-card no-bookmark-wrap">
        <p className="no-bookmark">No bookmark yet 😀</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="advice-card">
        {advices && (
          <InfiniteScroll
            dataLength={advices.length} //This is important field to render the next data
            next={fetchMoreAdvice}
            hasMore={hasMore}
            loader={<h4 className="custom-infinite-text--alert">Loading...</h4>}
            endMessage={
              <p className="custom-infinite-text--alert">
                <b>You have seen it all</b>
              </p>
            }
          >
            <Grid container spacing={4} className="advice-card-grid">
              {sortAdvices(advices, sortBy).map(
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
                      bookMarked={bookMarkedIDs.includes(id)}
                    />
                  );
                }
              )}
              {(loading || sortBy === "bookmarks") && (
                <CardSkeleton num={sortBy === "bookmarks" ? 4 : 8} />
              )}
            </Grid>
          </InfiniteScroll>
        )}
      </div>
    </React.Fragment>
  );
};
