const React = jest.requireActual('react')
// Workaround for jest with useEffect issue:
// https://github.com/facebook/react/issues/14050#issuecomment-438173736
module.exports = { ...React, useEffect: React.useLayoutEffect }