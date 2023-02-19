const data = [
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker",
    },
    {
        text: "Winners never quit and quitters never win.",
        author: "Vince Lombardi",
    },
    {
        text: "My biggest motivation? Just to keep challenging myself. I see life almost like one long University education that I never had -- everyday I’m learning something new.",
        author: "Richard Branson",
    },
    {
        text: "Every time you state what you want or believe, you’re the first to hear it. It’s a message to both you and others about what you think is possible. Don’t put a ceiling on yourself.",
        author: "Oprah Winfrey",
    },
    {
        text: "It’s fine to celebrate success but it is more important to heed the lessons of failure.",
        author: "Bill Gates",
    },
    {
        text: "I have not failed. I’ve just found 10,000 ways that won’t work.",
        author: "Thomas Edison",
    },
    {
        text: "Success is walking from failure to failure with no loss of enthusiasm.",
        author: "Winston Churchill",
    },
    {
        text: "Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.",
        author: "Mark Twain",
    },
    {
        text: "The price of success is hard work, dedication to the job at hand, and the determination that whether we win or lose, we have applied the best of ourselves to the task at hand.",
        author: "Vince Lombardi",
    },
    {
        text: "If you cannot do great things, do small things in a great way.",
        author: "Napoleon Hill",
    },
    {
        text: "What is not started will never get finished",
        author: "Johann Wolfgang von Goethe",
    },
];

const Quotes = () => {
    // pick a random quote
    const quote = data[Math.floor(Math.random() * data.length)];

    // return the quote as a JSX element
    return (
        <div className="flex flex-col w-full h-full space-y-3">
            <h3 className="leading-tight tracking-tight text-md text-light-accent">
                &#10077;{quote.text}
                &#10078;
            </h3>
            <p className="leading-tight tracking-tight text-md text-light-accent">
                — {quote.author}
            </p>
        </div>
    );
};

export default Quotes;
