import React, { Component } from 'react';
import { getCityTemps } from './api/APIUtils';
import chunk from 'lodash/chunk';

import Game from './components/Game';
import Menu from './components/Menu';

import cityIds from './cityIds.json';

export class App extends Component {
  state = {
    status: '',
    unit: 'METRIC',
    score: 0,
    questions: [],
    questionsHistory: [],
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
    if (this.state.questions.length - this.state.score > 3) return;

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

        const newQuestions = chunk(formattedRes, 2).map(citiesChunk => {
          return { status: 'PENDING', cities: citiesChunk };
        });

        this.setState(state => ({
          questions: [...state.questions, ...newQuestions],
          loading: false,
        }));
      })
      .catch(e => console.log(e));
  };

  handleCardClick = index => {
    this.fetchCities();

    const score = this.state.score;
    const currentQuestion = this.state.questions[score];

    if (currentQuestion.status !== 'PENDING') return;

    const pickedTemp = currentQuestion.cities[index].temp;
    const didGuess = currentQuestion.cities.every(
      city => pickedTemp >= city.temp
    );

    this.setState(state => ({
      questions: state.questions.map((cards, i) =>
        i === score
          ? { ...cards, status: didGuess ? 'CORRECT' : 'INCORRECT' }
          : cards
      ),
    }));

    if (didGuess) {
      setTimeout(this.incrementScore, 2000);
    } else {
      setTimeout(this.lose, 2000);
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
    const score = this.state.score;

    const newQuestionsHistory = this.state.questions
      .slice(0, score + 1)
      .reverse();

    this.setState(state => ({
      questionsHistory: [...newQuestionsHistory, ...state.questionsHistory],
      questions: state.questions.slice(score + 1),
      status: 'LOST',
    }));
  };

  play = () => {
    this.setState({
      status: 'PLAYING',
      score: 0,
    });
  };

  viewHistory = () => {
    this.setState({
      status: 'HISTORY',
    });
  };

  render() {
    if (this.state.loading) return null;

    return (
      <>
        <Menu
          score={this.state.score}
          status={this.state.status}
          changeUnit={this.changeUnit}
          unit={this.state.unit}
        />
        <Game
          handleCardClick={this.handleCardClick}
          question={this.state.questions[this.state.score]}
          questionsHistory={this.state.questionsHistory}
          unit={this.state.unit}
          status={this.state.status}
          score={this.state.score}
          play={this.play}
          viewHistory={this.viewHistory}
        />
      </>
    );
  }
}

export default App;
