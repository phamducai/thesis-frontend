export default function tienDien(energy) {
  if (!energy) return 0;

  if (energy < 50) {
    return energy * 1.678;
  } else if (50 < energy < 100) {
    return (energy - 50) * 1.734 + 50 * 1.678;
  } else if (101 < energy < 200) {
    return (energy - 100) * 2.014 + 50 * 1.678 + 50 * 1.734;
  } else if (201 < energy < 300) {
    return 50 * 1.678 + 50 * 1.73 + 100 * 2.014 + (energy - 200) * 2.536;
  } else if (301 < energy < 400) {
    return (
      50 * 1.678 +
      50 * 1.73 +
      100 * 2.014 +
      100 * 2.536 +
      (energy - 300) * 2.927
    );
  } else if (energy > 401) {
    return (
      50 * 1.678 +
      50 * 1.73 +
      100 * 2.014 +
      100 * 2.536 +
      100 * 2.927 +
      (energy - 400) * 2.927
    );
  }
}
