/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Briefing } from './components/Briefing';
import { Explore } from './components/Explore';
import { AskMyET } from './components/AskMyET';
import { Profile } from './components/Profile';
import { StoryDetail } from './components/StoryDetail';
import { BottomNav } from './components/BottomNav';
import { Story } from './constants';

type Screen = 'briefing' | 'explore' | 'ask' | 'profile' | 'story-detail';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('briefing');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const navigateToStory = (story: Story) => {
    setSelectedStory(story);
    setCurrentScreen('story-detail');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'briefing':
        return <Briefing onStoryClick={navigateToStory} />;
      case 'explore':
        return <Explore />;
      case 'ask':
        return <AskMyET />;
      case 'profile':
        return <Profile />;
      case 'story-detail':
        return selectedStory ? (
          <StoryDetail story={selectedStory} onBack={() => setCurrentScreen('briefing')} />
        ) : (
          <Briefing onStoryClick={navigateToStory} />
        );
      default:
        return <Briefing onStoryClick={navigateToStory} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary/30">
      {renderScreen()}
      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
}
