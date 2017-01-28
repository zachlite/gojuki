// track collision


constructor() {

    var track = [];

    // make track pieces
    track.push(track_piece);

    // add track to stage
    for each track as track_piece
        this.stage.addChild(track_piece);

}


update() {

    for each track as track_piece

        if (player is inside track_piece) {
            
            if (track_piece is straight) {

                normalize track and car orientation

                if (player on shoulder) {
                    slow player
                }

                if (player outside track) {
                    keep player in bounds and slow player according to angle relative to boundary
                }

            }   

            if (track_piece is curved) {

                if (player on shoulder) {
                    // a player vertex > outter shoulder radius
                    // a player vertex < inner shoulder radius
                    slow player
                }

                if (player outside track) {
                    // a player vertex > outter track radius
                    // a player vertex < inner track radius
                    keep player in bounds and slow player
                }

            }

        }

}