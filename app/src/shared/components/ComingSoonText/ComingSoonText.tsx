import React from 'react'
import { messages } from '../../resources'

interface ComingSoonTextProps {}

export const ComingSoonText: React.FC<ComingSoonTextProps> = () => {
  return <div style={{ textAlign: 'center' }}>{messages.COMING_SOON}</div>
}
