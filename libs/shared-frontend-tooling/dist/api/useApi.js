import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const useApi = (url, options) => {
    const { getAccessTokenSilently } = useAuth0();
    const [state, setState] = useState({
        error: null,
        loading: true,
        data: null,
    });
    const [refreshIndex, setRefreshIndex] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                const { audience, scope, ...fetchOptions } = options;
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: { audience, scope },
                });
                const res = await fetch(url, {
                    ...fetchOptions,
                    headers: {
                        ...fetchOptions.headers,
                        // Add the Authorization header to the existing headers
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setState({
                    ...state,
                    data: await res.json(),
                    error: null,
                    loading: false,
                });
            }
            catch (error) {
                setState({
                    ...state,
                    error: error,
                    loading: false,
                });
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshIndex]);
    return {
        ...state,
        refresh: () => setRefreshIndex(refreshIndex + 1),
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwaS91c2VBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDNUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBUTlDLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQVcsRUFBRSxPQUE0QixFQUFFLEVBQUU7SUFDaEUsTUFBTSxFQUFFLHNCQUFzQixFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDOUMsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDL0IsS0FBSyxFQUFFLElBQUk7UUFDWCxPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUksRUFBRSxJQUFJO0tBQ2IsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEQsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNYLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDUixJQUFJO2dCQUNBLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsWUFBWSxFQUFFLEdBQUcsT0FBTyxDQUFDO2dCQUNyRCxNQUFNLFdBQVcsR0FBRyxNQUFNLHNCQUFzQixDQUFDO29CQUM3QyxtQkFBbUIsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7aUJBQzNDLENBQUMsQ0FBQztnQkFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUU7b0JBQ3pCLEdBQUcsWUFBWTtvQkFDZixPQUFPLEVBQUU7d0JBQ0wsR0FBSSxZQUFZLENBQUMsT0FBZTt3QkFDaEMsdURBQXVEO3dCQUN2RCxhQUFhLEVBQUUsVUFBVSxXQUFXLEVBQUU7cUJBQ3pDO2lCQUNKLENBQUMsQ0FBQztnQkFDSCxRQUFRLENBQUM7b0JBQ0wsR0FBRyxLQUFLO29CQUNSLElBQUksRUFBRSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUU7b0JBQ3RCLEtBQUssRUFBRSxJQUFJO29CQUNYLE9BQU8sRUFBRSxLQUFLO2lCQUNqQixDQUFDLENBQUM7YUFDTjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLFFBQVEsQ0FBQztvQkFDTCxHQUFHLEtBQUs7b0JBQ1IsS0FBSyxFQUFFLEtBQVk7b0JBQ25CLE9BQU8sRUFBRSxLQUFLO2lCQUNqQixDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDTCx1REFBdUQ7SUFDM0QsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUVuQixPQUFPO1FBQ0gsR0FBRyxLQUFLO1FBQ1IsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0tBQ25ELENBQUM7QUFDTixDQUFDLENBQUMifQ==