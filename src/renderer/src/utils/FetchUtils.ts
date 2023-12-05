export async function fetchData(data, set, url) {
	try {
		// 5. Dispatch the request for the users
	  const response = await fetch(`http://localhost:8080${url}`);
		
		if(response.ok) {
  	      const data = await response.json();
		  set(data);
			
		} else {
			const text = await response.text();
			throw new Error(text);
		}
		
	} catch(error) {
		// 6b. if there is a fetch error - deal with it
		// and let observers know
		data.error = error;
		set(data);
	}
}

export function makeSubscribe(data, _args, url) {
	// 2. Create a closure with access to the 
	// initial data and initialization arguments
	return set => {
		// 3. This won't get executed until the store has 
		// its first subscriber. Kick off retrieval.
		fetchData(data, set, url);
		
		// 4. We're not waiting for the response.
		// Return the unsubscribe function which doesn't do
		// do anything here (but is part of the stores protocol).
		return () => {};
	};
}