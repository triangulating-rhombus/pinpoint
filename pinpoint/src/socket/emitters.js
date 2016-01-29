import

{ userID: 1, longitude: 120.22, latitude: 11.22, time: new Date(), tags: ["coding", "books", "eat"]}

export () => {
}

socket.emit('update', { userID: 1, longitude: 120.22, latitude: 11.22, time: new Date(), tags: ["coding", "books", "eat"])
