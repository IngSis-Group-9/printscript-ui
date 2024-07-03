import {withNavbar} from "../components/navbar/withNavbar.tsx";
import {SnippetTable} from "../components/snippet-table/SnippetTable.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SnippetDetail} from "./SnippetDetail.tsx";
import {Drawer} from "@mui/material";
import {useGetSnippets} from "../utils/queries.tsx";
import {usePaginationContext} from "../contexts/paginationContext.tsx";
import useDebounce from "../hooks/useDebounce.ts";
import {useAuth0} from "@auth0/auth0-react";

const HomeScreen = () => {
  const {id: paramsId} = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [snippetName, setSnippetName] = useState('');
  const [snippetId, setSnippetId] = useState<string | null>(null)
  const {page, page_size, count, handleChangeCount} = usePaginationContext()
  const { getAccessTokenSilently } = useAuth0();
  const {data, isLoading} = useGetSnippets(page, page_size, snippetName)

    useEffect(() => {
        const getAccessToken = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                localStorage.setItem('authAccessToken', accessToken);
            } catch (e) {
                console.error(e);
            }
        };

        getAccessToken();
    }, [getAccessTokenSilently]);

  useEffect(() => {
    if (data?.count && data.count != count) {
      handleChangeCount(data.count)
    }
  }, [count, data?.count, handleChangeCount]);


  useEffect(() => {
    if (paramsId) {
      setSnippetId(paramsId);
    }
  }, [paramsId]);

  const handleCloseModal = () => setSnippetId(null)

  // DeBounce Function
  useDebounce(() => {
        setSnippetName(
            searchTerm
        );
      }, [searchTerm], 800
  );

  const handleSearchSnippet = (snippetName: string) => {
    setSearchTerm(snippetName);
  };

  return (
      <>
          <div
            style={{
                height: '80vh',
                overflowY: 'auto',
                paddingRight: '16px',
                paddingBottom: '16px',
                marginTop: '32px',
            }}
          >
              <SnippetTable loading={isLoading} handleClickSnippet={setSnippetId} snippets={data?.snippets}
                            handleSearchSnippet={handleSearchSnippet}/>
              <Drawer open={!!snippetId} anchor={"right"} onClose={handleCloseModal}>
                  {snippetId && <SnippetDetail handleCloseModal={handleCloseModal} id={snippetId}/>}
              </Drawer>
          </div>
      </>
  )
}

export default withNavbar(HomeScreen);

