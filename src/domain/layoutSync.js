function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export class MirroredLayoutSync {
  static isMirroredTwoPlayer(zones = []) {
    return zones.some((zone) => zone.id.startsWith('p1_')) && zones.some((zone) => zone.id.startsWith('p2_'));
  }

  static mirrorZoneId(zoneId) {
    if (zoneId.startsWith('p1_')) return zoneId.replace(/^p1_/, 'p2_');
    if (zoneId.startsWith('p2_')) return zoneId.replace(/^p2_/, 'p1_');
    return null;
  }

  static mirroredZonePosition(sourceZone, gridCols, gridRows) {
    return {
      colStart: clamp(gridCols - sourceZone.colStart - sourceZone.colSpan + 2, 1, gridCols),
      colSpan: clamp(sourceZone.colSpan, 1, gridCols),
      rowStart: clamp(gridRows - sourceZone.rowStart - sourceZone.rowSpan + 2, 1, gridRows),
      rowSpan: clamp(sourceZone.rowSpan, 1, gridRows),
    };
  }

  static applyMirroredZonePatch({ zones, sourceZoneId, patch, gridCols, gridRows }) {
    let nextZones = zones.map((zone) => (zone.id === sourceZoneId ? { ...zone, ...patch } : zone));

    const mirroredZoneId = MirroredLayoutSync.mirrorZoneId(sourceZoneId);
    const sourceZone = nextZones.find((zone) => zone.id === sourceZoneId);
    if (!mirroredZoneId || !sourceZone || !nextZones.some((zone) => zone.id === mirroredZoneId)) {
      return nextZones;
    }

    const mirroredPatch = {};
    const touchesGeometry = ['colStart', 'colSpan', 'rowStart', 'rowSpan'].some((key) => Object.prototype.hasOwnProperty.call(patch, key));
    if (touchesGeometry) Object.assign(mirroredPatch, MirroredLayoutSync.mirroredZonePosition(sourceZone, gridCols, gridRows));
    if (Object.prototype.hasOwnProperty.call(patch, 'upsideDown')) mirroredPatch.upsideDown = !sourceZone.upsideDown;
    if (Object.prototype.hasOwnProperty.call(patch, 'name')) mirroredPatch.name = sourceZone.name;
    if (Object.prototype.hasOwnProperty.call(patch, 'icon')) mirroredPatch.icon = sourceZone.icon;
    if (Object.prototype.hasOwnProperty.call(patch, 'text')) mirroredPatch.text = sourceZone.text;

    return nextZones.map((zone) => (zone.id === mirroredZoneId ? { ...zone, ...mirroredPatch } : zone));
  }

  static mirrorTrackPosition(position) {
    if (position === 'left') return 'right';
    if (position === 'right') return 'left';
    if (position === 'center-left') return 'center-right';
    if (position === 'center-right') return 'center-left';
    return position;
  }

  static applyMirroredScoreTrackPatch({ scoreTracks, editedIndex, patch, canvasWidth }) {
    const nextTracks = scoreTracks.map((track, index) => (index === editedIndex ? { ...track, ...patch } : track));
    if (nextTracks.length !== 2) return nextTracks;

    const mirrorIndex = editedIndex === 0 ? 1 : 0;
    const sourceTrack = nextTracks[editedIndex];
    const mirroredTrack = { ...nextTracks[mirrorIndex] };
    const changed = (key) => Object.prototype.hasOwnProperty.call(patch, key);

    if (changed('count')) mirroredTrack.count = sourceTrack.count;
    if (changed('name')) mirroredTrack.name = sourceTrack.name;
    if (changed('orbScale')) mirroredTrack.orbScale = sourceTrack.orbScale;

    if (changed('position')) {
      mirroredTrack.position = MirroredLayoutSync.mirrorTrackPosition(sourceTrack.position);
      mirroredTrack.x = null;
    }

    if (changed('yStart') || changed('yEnd')) {
      mirroredTrack.yStart = clamp(1 - (sourceTrack.yEnd ?? 0.92), 0, 1);
      mirroredTrack.yEnd = clamp(1 - (sourceTrack.yStart ?? 0.08), 0, 1);
    }

    if (changed('upsideDown')) mirroredTrack.upsideDown = !sourceTrack.upsideDown;

    if (changed('x')) {
      if (typeof sourceTrack.x === 'number') mirroredTrack.x = Math.max(0, canvasWidth - sourceTrack.x);
      else mirroredTrack.x = null;
    }

    return nextTracks.map((track, index) => (index === mirrorIndex ? mirroredTrack : track));
  }
}

export { clamp };
