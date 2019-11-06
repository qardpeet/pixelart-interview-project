import React, { Component } from 'react';
import { getCityTemps } from './api/APIUtils';
import chunk from 'lodash/chunk';

import Game from './components/Game';
import Menu from './components/Menu';

import cityIds from './cityIds.json';

export class App extends Component {
  state = {
    status: 'PLAYING',
    unit: 'METRIC',
    score: 0,
    currentGame: [],
    gameHistory: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchCities();
  }

  randomCities = (size = 20) => {
    const length = cityIds.length;
    const randCityIds = [];

    for (let i = 0; i < size; i++) {
      const randIndex = Math.floor(Math.random() * length);
      randCityIds.push(cityIds[randIndex]);
    }

    return randCityIds;
  };

  fetchCities = () => {
    //only fetch more cities if close to finish
    if (this.state.currentGame.length - this.state.score > 3) return;

    const randCityIds = this.randomCities();

    getCityTemps(randCityIds)
      .then(res => {
        const formattedRes = res.list.map(city => {
          return {
            temp: city.main.temp,
            name: city.name,
            country: city.sys.country,
          };
        });

        const steps = chunk(formattedRes, 2).map(cities => {
          return { status: 'PENDING', cities };
        });

        this.setState(state => ({
          currentGame: [...state.currentGame, ...steps],
          loading: false,
        }));
      })
      .catch(e => console.log(e));
  };

  handleCardClick = index => {
    this.fetchCities();

    const score = this.state.score;
    const current = this.state.currentGame[score];

    if (current.status !== 'PENDING') return;

    const pickedTemp = current.cities[index].temp;
    const didGuess = current.cities.every(city => pickedTemp >= city.temp);

    this.setState(state => ({
      currentGame: state.currentGame.map((cards, i) =>
        i === score
          ? { ...cards, status: didGuess ? 'CORRECT' : 'INCORRECT' }
          : cards
      ),
    }));

    if (didGuess) {
      setTimeout(this.incrementScore, 2000);
    }
  };

  changeUnit = () => {
    this.setState(state => ({
      unit: state.unit === 'METRIC' ? 'IMPERIAL' : 'METRIC',
    }));
  };

  incrementScore = () => {
    this.setState(state => ({
      score: ++state.score,
    }));
  };

  lose = () => {
    this.setState({ status: 'LOST' });
  };

  render() {
    if (this.state.loading) return null;

    return (
      <>
        <Menu
          score={this.state.score}
          changeUnit={this.changeUnit}
          unit={this.state.unit}
        />
        <Game
          onCardClick={this.handleCardClick}
          cards={this.state.currentGame[this.state.score]}
          unit={this.state.unit}
          status={this.state.status}
          score={this.state.score}
        />
      </>
    );
  }
}

export default App;
