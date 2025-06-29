import User from './user';

describe('User class', function () {
  let user = null;

  beforeEach(function () {
    user = new User();
  });

  it('updates display position when told to', function () {
    // Arrange
    user.moveTo(1.0, 1.0);

    // Act
    user.updateDisplayPosition();

    // Assert
    expect(user.worldX).toBe(1.0);
    expect(user.worldY).toBe(1.0);
  });
});
