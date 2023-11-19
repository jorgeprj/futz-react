import './PlayersList.css';
import HeaderList from './headerList/HeaderList';
import PlayerList from './playerList/PlayerList';
import { useState } from 'react';

const PlayersList = ({ players, setPlayers, year }) => {

    const [sortColumn, setSortColumn] = useState('FutzScore');
    const [sortOrder, setSortOrder] = useState('desc');


    const handleSort = (column) => {
        const newOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';

        setSortColumn(column);
        setSortOrder(newOrder);

        const sortedPlayers = [...players].sort((a, b) => {
            let aValue, bValue;

            if (column === 'Overall') {
                aValue = a.overall;
                bValue = b.overall;
            } else if (column === 'Age') {
                aValue = b.age;
                bValue = a.age;
            } else if (column === 'Contract') {
                aValue = a.contract;
                bValue = b.contract;
            } else if (column === 'FutzScore') {
                aValue = a.futz;
                bValue = b.futz;
            }
            else {
                return 0;
            }
            return newOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });

        setPlayers(sortedPlayers);
    };

    return (
        <table className='players-list'>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <HeaderList column='Age' sortColumn={sortColumn} sortOrder={sortOrder} handleSort={handleSort} />
                    <HeaderList column='Contract' sortColumn={sortColumn} sortOrder={sortOrder} handleSort={handleSort} />
                    <HeaderList column='Overall' sortColumn={sortColumn} sortOrder={sortOrder} handleSort={handleSort} />
                    <HeaderList column='FutzScore' sortColumn={sortColumn} sortOrder={sortOrder} handleSort={handleSort} />
                </tr>
            </thead>
            <tbody>
                {players.map(player => (<PlayerList player={player} year={year} key={player.id} />))}
            </tbody>
        </table>
    )
}

export default PlayersList