import React from 'react'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/layout/loading/Loading';
import { getPlayer } from '../../services/players/playersService';
import Footer from '../../components/layout/footer/Footer';
import Header from '../../components/player/header/Header';
import BasicInfo from '../../components/player/basicInfo/BasicInfo';
import PlayStyles from '../../components/player/playStyles/PLayStyles';
import NationalHistory from '../../components/player/nationalHistory/NationalHistory';
import TeamHistory from '../../components/player/teamHistory/TeamHistory';
import TransferInfo from '../../components/player/transferInfo/TransferInfo';
import { FaAward } from 'react-icons/fa6';

const PlayerReport = ({ year }) => {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const playerData = await getPlayer(id);
                setPlayer(playerData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching player:', error);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='player'>
            <h1>
                {player.name}
                <span>{player.position}</span>
            </h1>
            <section className='content'>
                <section className='column-1'>
                    <Header player={player} year={year} />
                    <section className='player-infos'>
                        <TransferInfo player={player} year={year} />
                        <BasicInfo player={player} year={year} />
                        <section className='other-infos'>
                            {player.nationalTeam.length > 0 && <NationalHistory player={player} />}
                            <TeamHistory player={player} />
                        </section>
                    </section>
                </section>
                <section className='column-2'>
                    <div className='title'>
                        <h2>Detailed sheet</h2>
                        <h4>|</h4>
                        <p>Discussion</p>
                    </div>
                    <section className='player-content'>
                        <section>
                            <h3>Biography</h3>
                            <p>{player.bio}</p>
                        </section>
                        <section>
                            <h3>Analysis</h3>
                            <p>{player.analysis}</p>
                        </section>
                        {player.awards.length > 0 && (
                            <section>
                                <h3>Player Awards</h3>
                                <div className='awards'>
                                    {player.awards.map(award => (
                                        <p className='award' key={`${award.name} ${award.season}`}>
                                            <FaAward />
                                            {award.name}
                                            : {award.season}
                                        </p>
                                    ))}
                                </div>
                            </section>
                        )}
                    </section>
                </section>
                <section className='column-3'>
                    {player.playStyles.length > 0 && (
                        <section>
                            <PlayStyles player={player} />
                        </section>
                    )}

                    {player.stats.length > 0 && (
                        <section className='player-stats'>
                            <h4>{player.stats[0].season} Stats</h4>
                            <div className='stats'>
                                <p>Matches: <strong>{player.stats[0].matches}</strong></p>
                                <p>Goals: <strong>{player.stats[0].goals}</strong></p>
                                <p>Assists: <strong>{player.stats[0].assists}</strong></p>
                                <p>Matches without goals: <strong>{player.stats[0].matchesWithoutGoals}</strong></p>
                                <p>Modifier: <strong>{player.stats[0].modifier}</strong></p>
                            </div>
                        </section>
                    )}

                    <section>
                        <h4>Author</h4>
                        <div className='logo'>hattrick</div>
                    </section>
                    <section>
                        <h4>Sources</h4>
                        <div className='links'>
                            <a href="https://sofifa.com">https://sofifa.com</a>
                            <a href="https://www.wikipedia.org">https://www.wikipedia.org</a>
                            <a href="https://www.transfermarkt.com">https://www.transfermarkt.com</a>
                        </div>
                    </section>
                </section>
            </section>
            <Footer />
        </div>
    )
}

export default PlayerReport