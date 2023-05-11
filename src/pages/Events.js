import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
  // const data = useLoaderData();

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  // return <EventsList events={data} />;
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json({ message: 'Could not fetch events.' }, { status: 500 });
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    // return { isError: true, message: 'Could not fetch events' };
    // throw { message: 'Could not fetch events.' };
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(), //loadEvents() returns a promise
  });
}

//////////////////////////////////////////////////////////////////
// OLD Code
// import { useEffect, useState } from 'react';

// import EventsList from '../components/EventsList';

// function EventsPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchedEvents, setFetchedEvents] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function fetchEvents() {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:8080/events');

//       if (!response.ok) {
//         setError('Fetching events failed.');
//       } else {
//         const resData = await response.json();
//         setFetchedEvents(resData.events);
//       }
//       setIsLoading(false);
//     }

//     fetchEvents();
//   }, []);
//   return (
//     <>
//       <div style={{ textAlign: 'center' }}>
//         {isLoading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//       </div>
//       {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
//     </>
//   );
// }

// export default EventsPage;
