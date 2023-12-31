import React, { useEffect, useState } from 'react'
import './Home.css'

import { getTeam } from '../../services/teams/teamsService';
import { getPlayers } from '../../services/players/playersService';
import { getManager } from '../../services/managers/managersService';
import { FaClockRotateLeft } from 'react-icons/fa6'

import ManagerSection from '../../components/pages/home/managerSection/ManagerSection';
import TeamSection from '../../components/pages/home/teamSection/TeamSection';
import PlayerCard from '../../components/pages/home/playerCard/PlayerCard';
import BestPlayers from '../../components/pages/home/bestPlayers/BestPlayers';

import Loading from '../../components/layout/loading/Loading';
import Footer from '../../components/layout/footer/Footer';

import Button from '../../components/shared/button/Button';

const Home = ({ year }) => {

    const [manager, setManager] = useState(null);
    const [team, setTeam] = useState(null);
    const [players, setPlayers] = useState(null);
    const [teamPlayers, setTeamPlayers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const managerData = await getManager(999999);
                setManager(managerData);

                const teamData = await getTeam(113926);
                setTeam(teamData);

                const playersData = await getPlayers();
                setPlayers(playersData);

                const salfordCityPlayers = playersData.filter(player =>
                    player.teamHistory[0].team.name === "Salford City"
                );
                setTeamPlayers(salfordCityPlayers);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const delay = 500;

        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='home'>
            <section className='main'>
                <h2>Welcome to <span className='logo'>hattrick</span></h2>
                <p>
                    Where the passion for football meets the precision of statistics.
                    Experience realistic career mode with Salford City FC.
                    Let the game begin!
                </p>
                <div className='green-btn'>
                    <Button text={"Salford City FC"} link={`/team/${team.id}`}/>
                </div>
            </section>

            <section className='content'>
                <div className='title'>
                    <h3>
                        Career<span>Mode</span>
                    </h3>
                    <p>
                        <FaClockRotateLeft />
                        Updated {year} - Season Start
                    </p>
                </div>
                <ManagerSection manager={manager} />
            </section>

            <section className='featured'>
                <TeamSection team={team} />
            </section>

            <section className='content'>
                <div className='title'>
                    <h3>
                        Featured<span>Scouted Players</span>
                    </h3>
                    <p>
                        <FaClockRotateLeft />
                        Updated {year} - Season Start
                    </p>
                </div>
                <div className='players-card'>
                    {players
                        .filter(player => player.isScouted && player.scoutStatus === "Green")
                        .reverse()
                        .slice(0, 4)
                        .map(player => (
                            <PlayerCard player={player} year={year} key={player.id} />
                        ))
                    }
                </div>
            </section>

            <section className='salford-section'>
                <BestPlayers players={teamPlayers} />
                <div className='salford-banner'>
                    <img src="../src/assets/champions.png" alt="Salford Champions" />
                    <div className='text'>
                        <h3>Be a <br /> hattrick teammate</h3>
                        <p>
                            Have you thought about having the chance to contribute to the growth of
                            one of the greatest realistic career mode in the world ? Become a hattrick teammate
                        </p>
                        <div className='buttons'>
                            <div className='green-btn'>
                                <Button text={"Create account"} link={`/#`}/>
                            </div>
                            <div className='donate'>
                                <Button text={"Donate"} link={`/#`}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='content final-section'>
                <div className='title final-section'>
                    <h3>Hattrick E-books</h3>
                </div>
                <div className='text'>
                    <p>
                        We have crafted an immersive collection of Hattrick E-books dedicated to enhancing your
                        journey in the world of EA FC 24's Career Mode. Dive into a realm of unparalleled realism
                        as you embark on a captivating career trajectory. Our meticulously curated ebooks are
                        designed to empower you with comprehensive data, insightful statistics, and rich
                        historical context, ensuring that every decision you make contributes to the evolution
                        of your virtual soccer empire.
                    </p>
                    <br />
                    <p>
                        Whether you're a seasoned manager or a novice tactician, our resources provide a perfect
                        blend of strategic insights and entertainment, making the pursuit of excellence in the game
                        both informative and enjoyable. Immerse yourself in the world of Hattrick E-books, where
                        each page unfolds a new chapter in your quest for virtual glory. Elevate your gaming
                        experience with our in-depth content, and discover the thrill of constructing the most
                        realistic and rewarding mode in EA FC 24, filled with data-driven strategies, historical
                        depth, and, most importantly, an abundance of fun.
                    </p>
                </div>
                <Button text={"Go to store"} link={`/#`}/>
            </section>
            <Footer />
        </div>
    )
}

export default Home