// declare routes
const routes = {
    "/404": {
        template: "/templates/404.html",
        title: "404",
        description: "Error 404, page not found"
    },
    "/" : {
        template: "/templates/index.html",
        head_template: "/templates/index_head.html",
        title: "crowsnest.me",
        description: "A hub for high quality tools.",
        keywords: "Destiny, Destiny2, Destiny 2, Vesper's Host, Vespers Host, Dungeon, Secret, Puzzle, Weapon Focusing, Icrebreaker, Ice Breaker, Catalyst, Calculator, Solver, Tool, Solution, D&D, Dungeons and Dragons, Token Stamp, Tokenizer, VTT, Virtual Tabletop, Tokens, Pathfinder, P2E, Pathfinder 2nd Edition, Pathfinder 2E, art, Token Creator, Foundry, FoundryVTT, Roll20, Foundry Virtual Tabletop"
    },
    "/vespers" : {
        template: "/templates/vespers.html",
        head_template: "/templates/vespers_head.html",
        title: "Vesper's Solution",
        description: "A helpeful tool for automatically calculating the solution to the secret puzzles for weapon focusing in the Vesper's Host dungeon in Destiny 2.",
        keywords: "Destiny, Destiny2, Destiny 2, Vesper's Host, Vespers Host, Dungeon, Secret, Puzzle, Weapon Focusing, Icrebreaker, Ice Breaker, Catalyst, Calculator, Solver, Tool, Solution",
        js: ["/js/solver.js"]
    }
};

const deafault_head_template = "/templates/index_head.html";


//function to handle url location
const locationHandler = async () => {
    let location = window.location.pathname; // get the url path
    // if the path length is 0, set it to primary page route
    if (location.length == 0) {
        location = "/";
    }
    console.log(window.location.pathname);
    // get the route object from the urlRoutes object
    const route = routes[location.toLowerCase()];
    // check for 404
    if (typeof route === 'undefined')
    {
        window.location.replace("/404.html");
        return;
    }
    
    // load the content html from the template
    $("#content").load(route.template);
    console.log(route.template);
    
    // set the heading if it exists
    if ('head_template' in route)
    {
        // load the heading html from the template
        $("#heading").load(route.head_template);
    }
    else
    {
        // load the default heading template
        $("#heading").load(default_head_template);
    }
    
    // set the title of the document to the title of the route
    document.title = route.title;
    // set the description of the document to the description of the route
    if ('description' in route)
    {
        document
            .querySelector('meta[name="Description"]')
            .setAttribute("content", route.description);
    }
    // set the keywords of the document to the description of the route
    if ('keywords' in route)
    {
        document
            .querySelector('meta[name="Keywords"]')
            .setAttribute("content", route.keywords);
    }
    // load any necessary js for the new page
    if ('js' in route)
    {
        for (let i = 0; i < route.js.length; i++)
        {
            $.getScript(route.js[i]);
        }
    }
};

// function to route based on url
const route = (event) => {
    event = event || window.event; // get window.event if event argument not provided
    event.preventDefault();
    // window.history.pushState(state, unused, target link);
    window.history.pushState({}, "", event.target.href);
    locationHandler();
};

// add an event listener to the window that watches for url changes
window.onpopstate = locationHandler;
// call the urlLocationHandler function to handle the initial url
window.route = route;

$(document).ready(function()
{
    // call the urlLocationHandler function to handle the initial url
    locationHandler();
});

