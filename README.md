# Activity 1,2,3 Game

A multilingual, interactive browser-based board game for 1 to 4 players with AI-powered activity generation, custom activities, history tracking, and responsive layout options.

## 🎮 Features

### Core Features
- **Multi-Player Support**: 1 to 4 players
- **Age Groups**: Specialized activities for "Kids" (3-9 years) and "Adults"
- **Multilingual**: Full support for English (EN), Nepali (NE), and Dutch (NL)
- **Interactive Gameplay**:
    - Press-and-hold dice rolling mechanic
    - Animated character (jumping, dancing, spinning, waving)
    - Sound effects for interactions (using Web Audio API)
    - Celebration confetti animations

### ✨ New Features (Enhanced Version)

#### 🎯 Custom Activities Management
- **Add Your Own Activities**: Create custom activities in all three languages
- **Edit & Delete**: Full CRUD operations for your activities
- **Smart Integration**: Custom activities are automatically mixed with default activities during gameplay
- **Persistent Storage**: Activities are saved in your browser (localStorage)

**How to Use:**
1. Click the "🎯 Manage Activities" button on the setup screen
2. Click "➕ Add New Activity" to create a new activity
3. Fill in the activity text for all three languages
4. Select the age group (Kids or Adults)
5. Save and start playing!

#### 🤖 AI-Powered Activity Generation
- **Multiple AI Providers**: Support for OpenAI (GPT), Anthropic (Claude), and Google (Gemini)
- **Safe & Simple**: Generate age-appropriate activities automatically
- **Fallback**: Automatically uses predefined activities if AI is unavailable

**How to Use:**
1. Click the "⚙️ Settings" button
2. Select your AI provider
3. Enter your API key (stored securely in your browser)
4. Optionally enable "Generate new activities when starting each game"
5. The game will now generate fresh activities!

**Getting an API Key:**
- **OpenAI**: Visit [platform.openai.com](https://platform.openai.com)
- **Anthropic**: Visit [console.anthropic.com](https://console.anthropic.com)
- **Google Gemini**: Visit [ai.google.dev](https://ai.google.dev)

#### 📜 Activity History
- **Track All Activities**: Every activity performed is saved with timestamp
- **Session Grouping**: Activities grouped by game sessions
- **Export**: Download your history as JSON
- **Clear**: Option to clear all history

**How to Use:**
1. Click the "📜 History" button (bottom-left)
2. View all past activities organized by session
3. Export or clear as needed

#### 🖥️ Layout Toggle (Portrait/Landscape)
- **Portrait Mode**: Optimized for mobile devices and vertical screens (📱)
- **Landscape Mode**: Optimized for desktop and horizontal screens (🖥️)
- **Responsive**: Automatically adjusts fonts and element sizes
- **Persistent**: Your preference is saved

**How to Use:**
1. Click the layout button (top-right)
2. Toggle between 📱 (Portrait) and 🖥️ (Landscape)
3. Layout preference is automatically saved

## 🚀 Getting Started

### Basic Setup
1. Open `activitygame123 gemini.html` in a modern web browser
2. Select number of players (1-4)
3. Select age group (Kids or Adults)
4. Click "Start Game"

### Playing the Game
1. Press and hold the **SPACEBAR** to roll the dice
2. Watch the animated character demonstrate the activity
3. Listen to the activity in multiple languages
4. Complete the activity shown on screen
5. Click "Next Player" when done
6. The game lasts for 12 rounds

## 📁 Files

- **activitygame123 gemini.html**: Main game file with all features
- **game-features.js**: External JavaScript for new features (custom activities, history, settings, layout)
- **activitygame123_backup.html**: Backup of the original file
- **activitygame123 claude.html**: Alternative version

## 🔧 Technical Details

### Technologies Used
- Single-file HTML structure (HTML + CSS + JS)
- Web Audio API for sound effects
- Speech Synthesis API for multilingual voice
- localStorage for data persistence
- Fetch API for AI integration (optional)

### Data Storage
All data is stored locally in your browser using `localStorage`:
- **activityGame_settings**: AI provider and API key settings
- **activityGame_customActivities**: Your custom activities
- **activityGame_history**: Activity history (last 200 entries)
- **activityGame_layout**: Layout preference (portrait/landscape)

### Browser Compatibility
- Modern browsers with ES6+ support
- Chrome, Firefox, Edge, Safari (latest versions)
- Mobile browsers supported

## 🔒 Privacy & Security

- **All data stored locally**: No data is sent to any server except AI APIs (when enabled)
- **API Keys**: Stored in localStorage (encrypted by browser security)
- **No tracking**: No analytics or external tracking
- **Offline-capable**: Works without AI features in offline mode

## 🎨 Customization

You can customize the game by:
1. Adding your own activities via the UI
2. Modifying the CSS styles in the HTML file
3. Adjusting the number of rounds (currently 12)
4. Adding more languages (requires code modification)

## 📝 License

This is a fun, educational game. Feel free to use and modify for personal use.

## 🐛 Troubleshooting

**Activities not generating with AI:**
- Check your API key is correct
- Ensure you have credits/quota with your AI provider
- Check browser console for errors
- Fallback activities will be used automatically

**Custom activities not appearing:**
- Ensure you saved the activity properly
- Check if the age group matches your game settings
- Custom activities appear randomly alongside default ones

**Layout not responsive:**
- Try toggling the layout mode
- Clear browser cache if layout seems stuck
- Try different screen orientation on mobile

## 🤝 Contributing

Ideas for improvements are welcome! Some ideas for future enhancements:
- More languages
- More character animations
- Sound effects library
- Activity difficulty levels
- Multiplayer online mode
