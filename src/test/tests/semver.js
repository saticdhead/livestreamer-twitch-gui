define( [ "utils/semver" ], function( semver ) {

	var t = semver.tokenize;
	var m = semver.getMax;
	var s = semver.sort;


	module( "Semantic versioning" );


	test( "Tokenization", function() {

		deepEqual(
			[
				t( "foo" ),
				t( "1.0" ),
				t( "foo1.0.0bar" ),
				t( "1.0.0-" ),
				t( "1.0.0+" )
			],
			[
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			],
			"Invalid values"
		);

		deepEqual(
			[
				t( "1.0.0" ),
				t( "   v1.0.0   " ),
				t( "1.23.456" )
			],
			[
				[ [ 1, 0, 0 ], undefined ],
				[ [ 1, 0, 0 ], undefined ],
				[ [ 1, 23, 456 ], undefined ]
			],
			"Major, minor and patch version"
		);

		deepEqual(
			[
				t( "1.0.0-1.2.3" ),
				t( "1.0.0-alpha" ),
				t( "1.0.0-alpha.1" ),
				t( "1.0.0-alpha.beta1" ),
				t( "1.0.0-beta+abc123" )
			],
			[
				[ [ 1, 0, 0 ], [ 1, 2, 3 ] ],
				[ [ 1, 0, 0 ], [ "alpha" ] ],
				[ [ 1, 0, 0 ], [ "alpha", 1 ] ],
				[ [ 1, 0, 0 ], [ "alpha", "beta1" ] ],
				[ [ 1, 0, 0 ], [ "beta" ] ]
			],
			"Pre-release and build metadata"
		);

	});


	test( "Maximum", function() {

		deepEqual(
			[
				m([ "0.0.1", "0.0.10", "0.0.2" ]),
				m([ "0.0.10", "0.1.0", "0.2.0" ]),
				m([ "1.0.0", "0.10.0", "0.10.10" ])
			],
			[
				"0.0.10",
				"0.2.0",
				"1.0.0"
			],
			"Major, minor and patch version"
		);

		deepEqual(
			[
				m([ "1.0.0-123", "1.0.0-alpha" ]),
				m([ "1.0.0-alpha", "1.0.0-alpha.1" ]),
				m([ "1.0.0-alpha.1", "1.0.0-alpha.beta" ]),
				m([ "1.0.0-alpha.beta", "1.0.0-beta" ]),
				m([ "1.0.0-beta", "1.0.0-beta.2" ]),
				m([ "1.0.0-beta.2", "1.0.0-beta.11" ]),
				m([ "1.0.0-beta.11", "1.0.0" ])
			],
			[
				"1.0.0-alpha",
				"1.0.0-alpha.1",
				"1.0.0-alpha.beta",
				"1.0.0-beta",
				"1.0.0-beta.2",
				"1.0.0-beta.11",
				"1.0.0"
			],
			"Pre-release and build metadata"
		);

	});


	test( "Sorting", function() {

		deepEqual(
			s([
				"1.0.0",
				"0.0.10",
				"0.1.0",
				"0.10.0",
				"0.0.1"
			]),
			[
				"0.0.1",
				"0.0.10",
				"0.1.0",
				"0.10.0",
				"1.0.0"
			],
			"Major, minor and patch version"
		);

		deepEqual(
			s([
				"1.0.0-beta",
				"1.0.0-alpha.beta",
				"1.0.0-alpha1",
				"1.0.0-1",
				"1.0.0-beta.2",
				"1.0.0-alpha",
				"1.0.0",
				"1.0.0-beta.11",
				"1.0.0-alpha.1",
				"1.0.0-rc.1",
				"1.0.0-123"
			]),
			[
				"1.0.0-1",
				"1.0.0-123",
				"1.0.0-alpha",
				"1.0.0-alpha.1",
				"1.0.0-alpha.beta",
				"1.0.0-alpha1",
				"1.0.0-beta",
				"1.0.0-beta.2",
				"1.0.0-beta.11",
				"1.0.0-rc.1",
				"1.0.0"
			],
			"Pre-release and build metadata"
		);

	});

});
