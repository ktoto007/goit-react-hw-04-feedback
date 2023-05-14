import React, { useState } from 'react';
import { Section } from './section/Section';
import { Statistics } from './statistics/Statistics';
import { FeedbackOptions } from './feedbackOptions/FeedbackOptions';
import { Notification } from './notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = ['good', 'neutral', 'bad'];

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    if (good === 0 && countTotalFeedback() === 0) {
      return 0;
    } else {
      return Math.round((Number(good) / Number(countTotalFeedback())) * 100);
    }
  };

  const onLeaveFeedback = event => {
    switch (event.target.name) {
      case 'good':
        setGood(state => state + 1);
        break;

      case 'neutral':
        setNeutral(state => state + 1);
        break;

      case 'bad':
        setBad(state => state + 1);
        break;

      default:
        console.log('Invalid feedback type');
        break;
    }
  };

  return (
    <>
      <Section title="Please leave Feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>

      <Section title="Statistic">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};

// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   countTotalFeedback = (a, b, c) => {
//     return a + b + c;
//   };

//   countPositiveFeedbackPercentage = (a, b) => {
//     if (a === 0 && b === 0) {
//       return 0;
//     } else {
//       return Math.round((Number(a) / Number(b)) * 100);
//     }
//   };

//   onLeaveFeedback = event => {
//     this.setState(prevState => {
//       const { name } = event.target;
//       return {
//         [name]: 1 + prevState[name],
//       };
//     });
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const total = this.countTotalFeedback(good, neutral, bad);
//     const positivePercentage = this.countPositiveFeedbackPercentage(
//       good,
//       total
//     );

//     return (
//       <>
//         <Section title="Please leave Feedback">
//           <FeedbackOptions
//             options={Object.keys(this.state)}
//             onLeaveFeedback={this.onLeaveFeedback}
//           />
//         </Section>

//         <Section title="Statistic">
//           {total > 0 ? (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={total}
//               positivePercentage={positivePercentage}
//             />
//           ) : (
//             <Notification message="There is no feedback" />
//           )}
//         </Section>
//       </>
//     );
//   }
// }
