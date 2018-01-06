import React from 'react';
import Link from 'gatsby-link';

export default function About() {
    return (
        <div>
            <img alt="me" src={"https://secure.gravatar.com/avatar/0324ece38e4ae25a75c52f2bbec7967a?s=200"} />
            <p>
                I used to play guitar in a band called The Foxes, and had some great times 
                travelling around the world playing shows to 2 or 3 people who probably thought 
                we weren't too bad. We eventually released 
                an <a href={"https://open.spotify.com/album/4EbAdbLxJYVAKBmcyifvp0"}>album</a> but 
                5 years of being successfully ignored by the music industry I decided to make a career switch to 
                tinkering with code.
            </p>
            <p>
                I am currently the Director of Engineering at <a href={"https://www.echo.co.uk"}>Echo</a>, 
                a health-tech company that helps people manage their repeat prescriptions. 
                I have given talks about JavaScript at JSConfEU in Berlin and Yet Another Conference in Moscow. 
                The slides for both of these talks are on <a href={"https://speakerdeck.com/jonbretman"}>SpeakerDeck</a> and 
                there is a video of my Yet Another Conference talk <a href={"http://tech.yandex.ru/events/yac/2013/talks/1116/"}>here</a>.
            </p>
        </div>
    );
}