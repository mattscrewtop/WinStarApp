toolbox.options.debug = false;


// The route for any requests from the googleapis origin
toolbox.router.get('/(.*)', toolbox.cacheFirst, 
{
	cache: 
	{
		name: 'googleapis',
		maxEntries: 10,
		maxAgeSeconds: 3600 // cache for an hour
	},

	origin: /\.googleapis\.com$/,

	// Set a timeout threshold of 2 seconds
	networkTimeoutSeconds: 3
});

// The route for any requests from the winstarworldcasino origin
toolbox.router.get('/(.*)', toolbox.cacheFirst, 
{
	cache: 
	{
		name: 'winstarworldcasino',
		maxEntries: 50,
		maxAgeSeconds: 86400 // cache for a day
	},

	origin: /\.winstarworldcasino\.com$/,

	// Set a timeout threshold of 2 seconds
	networkTimeoutSeconds: 3
});

// The route for any requests from the screwtopmedia origin
toolbox.router.get('/(.*)', toolbox.cacheFirst, 
{
	cache: 
	{
		name: 'screwtopmedia',
		maxEntries: 10,
		maxAgeSeconds: 3600 // cache for a day
	},

	origin: /\.screwtopmedia\.com$/,

	// Set a timeout threshold of 2 seconds
	networkTimeoutSeconds: 3
});

console.log('CACHE-ITICUS 3');