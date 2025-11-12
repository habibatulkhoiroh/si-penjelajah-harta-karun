/*
  # Create Game Progress Table

  1. New Tables
    - `game_progress`
      - `id` (uuid, primary key) - Unique identifier for each game session
      - `session_id` (text, unique) - Browser session identifier
      - `current_level` (integer) - Current level player is on (1-100)
      - `total_score` (integer) - Total accumulated score
      - `highest_level` (integer) - Highest level reached
      - `created_at` (timestamptz) - When the game session started
      - `updated_at` (timestamptz) - Last update timestamp
      
  2. Security
    - Enable RLS on `game_progress` table
    - Add policy for public access (no authentication required)
    
  3. Notes
    - Game is accessible without login
    - Session ID is used to track individual players
    - Supports 100 levels with progressive difficulty
*/

CREATE TABLE IF NOT EXISTS game_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  current_level integer DEFAULT 1,
  total_score integer DEFAULT 0,
  highest_level integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON game_progress
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert"
  ON game_progress
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update by session"
  ON game_progress
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_game_progress_session ON game_progress(session_id);