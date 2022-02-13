import './Timetable.css';
import * as settings from '../settings';
import input from '../input.json';
import { getColor } from '../helpers/colors/colors';

const getColorByItemName = Object.fromEntries(
    [
        ...new Map(
            input
                .flatMap(day => day.items)
                .filter(item => item.color === undefined)
                .map(item => [item['name'], item]),
        ).keys(),
    ].map((name, index) => [name, getColor()]),
);

function getItemsByDay(day) {
    return input.find(entry => entry.day === day)?.items ?? [];
}

function Timetable() {
    return (
        <div className="App">
            <table>
                <thead>
                    <tr className="title">
                        <th colSpan={settings.hours.length + 1}>{settings.title}</th>
                    </tr>
                    <tr className="hours">
                        <th className="placeholder"> </th>
                        {settings.hours.map(({ from, to }, key) => (
                            <th key={key}>
                                {from} - {to}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {settings.days.map((day, key) => {
                        const currentDayItems = getItemsByDay(day);
                        let continuousItemColSpan = 0;

                        return (
                            <tr>
                                <td key={key}>{day}</td>
                                {settings.hours.map(({ from, to }, key) => {
                                    const currentHourItem = currentDayItems.find(
                                        item => item.from === from || item.to === to,
                                    );

                                    if (currentHourItem) {
                                        const isStarting = currentHourItem.from === from;
                                        const isEnding = currentHourItem.to === to;

                                        if ((isStarting && !isEnding) || (!isStarting && !isEnding)) {
                                            continuousItemColSpan++;
                                            return null;
                                        } else {
                                            const template = currentHourItem.image ? (
                                                <td
                                                    key={key}
                                                    colSpan={continuousItemColSpan + 1}
                                                    style={{
                                                        backgroundColor: currentHourItem.color,
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <img
                                                        src={`./images/${currentHourItem.image}`}
                                                        style={{ height: '1.5em' }}
                                                    />
                                                </td>
                                            ) : (
                                                <td
                                                    key={key}
                                                    colSpan={continuousItemColSpan + 1}
                                                    style={{
                                                        backgroundColor: getColorByItemName[currentHourItem.name],
                                                    }}
                                                    className={'item'}
                                                >
                                                    {currentHourItem.name}
                                                    <br />({currentHourItem.type})
                                                    <br />
                                                    {currentHourItem.place}
                                                    <br />
                                                    {currentHourItem.tutor}
                                                </td>
                                            );
                                            // reset the colspan to end the block
                                            continuousItemColSpan = 0;
                                            return template;
                                        }
                                    } else {
                                        // in case of continuous block
                                        if (continuousItemColSpan > 0) {
                                            continuousItemColSpan++;
                                            return null;
                                        }
                                        return <td key={key}></td>;
                                    }
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Timetable;
