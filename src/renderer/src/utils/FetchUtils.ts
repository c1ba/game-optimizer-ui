import { api } from "../services/api";

export async function fetchData(initialValue, set, url) {
	try {
		// 5. Dispatch the request for the users
	  const response = (await api.get(url));
		
		if(response.status === 200) {
		  set(response.data);
			
		} else {
			const text = response.statusText;
			throw new Error(text);
		}
		
	} catch(error) {
		console.error(error);
		set(initialValue);
	}
}

export function makeSubscribe(initialValue: unknown, _args: unknown, url: string) {
	// 2. Create a closure with access to the 
	// initial data and initialization arguments
	return set => {
		// 3. This won't get executed until the store has 
		// its first subscriber. Kick off retrieval.
		fetchData(initialValue, set, url);
		
		// 4. We're not waiting for the response.
		// Return the unsubscribe function which doesn't do
		// do anything here (but is part of the stores protocol).
		return () => {};
	};
}