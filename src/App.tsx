/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Briefing } from './components/Briefing';
import { Explore } from './components/Explore';
import { AskMyET } from './components/AskMyET';
import { Profile } from './components/Profile';
import { StoryDetail } from './components/StoryDetail';
import { BottomNav } from './components/BottomNav';
import { Onboarding } from './components/Onboarding';
import { Story } from './constants';

type Screen = 'briefing' | 'explore' | 'ask' | 'profile' | 'story-detail';

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>('briefing');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    const completed = localStorage.getItem('myet_onboarding_complete') === 'true';
    setHasCompletedOnboarding(completed);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('myet_onboarding_complete', 'true');
    setHasCompletedOnboarding(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('myet_onboarding_complete');
    setHasCompletedOnboarding(false);
    setCurrentScreen('briefing');
  };

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
        return <Profile onLogout={handleLogout} />;
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
      {!hasCompletedOnboarding ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <>
          {renderScreen()}
          <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        </>
      )}
    </div>
  );
}
