import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { GameProgress } from '../types/game';
import { generateSessionId } from '../utils/gameConfig';

const SESSION_STORAGE_KEY = 'treasure_hunt_session_id';

export function useGameProgress() {
  const [sessionId, setSessionId] = useState<string>('');
  const [gameProgress, setGameProgress] = useState<GameProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    let storedSessionId = localStorage.getItem(SESSION_STORAGE_KEY);

    if (!storedSessionId) {
      storedSessionId = generateSessionId();
      localStorage.setItem(SESSION_STORAGE_KEY, storedSessionId);
    }

    setSessionId(storedSessionId);

    const { data, error } = await supabase
      .from('game_progress')
      .select('*')
      .eq('session_id', storedSessionId)
      .maybeSingle();

    if (error) {
      console.error('Error loading game progress:', error);
    }

    if (data) {
      setGameProgress(data);
    } else {
      const newProgress: Omit<GameProgress, 'id' | 'created_at' | 'updated_at'> = {
        session_id: storedSessionId,
        current_level: 1,
        total_score: 0,
        highest_level: 1
      };

      const { data: insertedData, error: insertError } = await supabase
        .from('game_progress')
        .insert(newProgress)
        .select()
        .single();

      if (insertError) {
        console.error('Error creating game progress:', insertError);
      } else {
        setGameProgress(insertedData);
      }
    }

    setIsLoading(false);
  };

  const updateProgress = async (updates: Partial<GameProgress>) => {
    if (!sessionId || !gameProgress) return;

    const updatedProgress = {
      ...updates,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('game_progress')
      .update(updatedProgress)
      .eq('session_id', sessionId)
      .select()
      .single();

    if (error) {
      console.error('Error updating game progress:', error);
    } else {
      setGameProgress(data);
    }
  };

  return {
    gameProgress,
    isLoading,
    updateProgress
  };
}
