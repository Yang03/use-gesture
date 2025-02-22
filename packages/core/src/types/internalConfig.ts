import { GestureKey, CoordinatesKey } from './config'
import { State } from './state'
import { Vector2 } from './utils'

export type InternalGenericOptions = {
  target?: () => EventTarget
  eventOptions: AddEventListenerOptions
  window?: EventTarget
  enabled: boolean
  transform: (v: Vector2) => Vector2
}

export type InternalGestureOptions<Key extends GestureKey> = {
  enabled: boolean
  from: Vector2 | ((state: State[Key]) => Vector2)
  threshold: Vector2
  preventDefault: boolean
  triggerAllEvents: boolean
  rubberband: Vector2
  bounds: [Vector2, Vector2] | ((state: State[Key]) => [Vector2, Vector2])
  transform: (v: Vector2) => Vector2
}

export type InternalCoordinatesOptions<Key extends CoordinatesKey = CoordinatesKey> = InternalGestureOptions<Key> & {
  axis?: 'x' | 'y'
  lockDirection: boolean
}

export type InternalDragOptions = InternalCoordinatesOptions<'drag'> & {
  filterTaps: boolean
  useTouch: boolean
  pointerButtons: number
  pointerCapture: boolean
  preventScroll: number
  preventScrollAxis: 'x' | 'y' | 'xy'
  pointerLock: boolean
  device: 'pointer' | 'touch' | 'mouse'
  swipe: {
    velocity: Vector2
    distance: Vector2
    duration: number
  }
  delay: number
}

export type InternalPinchOptions = InternalGestureOptions<'pinch'> & {
  useTouch: boolean
  /**
   * When device is undefined, we'll be using wheel to zoom.
   */
  device: 'gesture' | 'pointer' | 'touch' | undefined
  lockDirection: boolean
}

type MoveAndHoverMouseOnly = {
  mouseOnly: boolean
}

export type InternalConfig = {
  shared: InternalGenericOptions
  drag?: InternalDragOptions
  wheel?: InternalCoordinatesOptions<'wheel'>
  scroll?: InternalCoordinatesOptions<'scroll'>
  move?: InternalCoordinatesOptions<'move'> & MoveAndHoverMouseOnly
  hover?: InternalCoordinatesOptions<'hover'> & MoveAndHoverMouseOnly
  pinch?: InternalPinchOptions
}
