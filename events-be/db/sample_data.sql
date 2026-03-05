USE events_db;

INSERT INTO Users (username, email, password, isAdmin, deletedAt)
VALUES
    ('admin',       'admin@example.com',       '$2b$10$bRQ0xOFuLnODzkgv3xh0VOq1RJkXBNLngiNE5ROHJ/3hmE9Au7ldS', 1, NULL),
    ('johnsmith',   'johnsmith@example.com',   '$2b$10$Cpd.R5PLaKo.f/RCwNjQ6uVH9Yw.tJPbZ2W0R2RJJ0RFL0Ogqkx3q',     0, NULL),
    ('janedoe',     'janedoe@example.com',     '$2b$10$ZaRe3fbgclmLyjX0wIZHNu/33/RHPFTFnGI1i0VwuJXqWVlY5O38.',     0, NULL),
    ('mikebrown',   'mikebrown@example.com',   '$2b$10$ohdariOWYhWI7a5svVWe5elFjtjxeUyAjVXZ89MNPoAQOSK0bcO8a',     0, NULL),
    ('emilyclark',  'emilyclark@example.com',  '$2b$10$KiSLPFPLw4vi8Met8FEA/OleqLXKSBJxx49g1ksw6nKZpmdnlj/r2',     0, NULL),
    ('davidmiller', 'davidmiller@example.com', '$2b$10$yrzhBkGHDPWU4hmXp43pTuaMLAAFppXwRBAd/sqRWZICiKEfyq61a',     0, NULL),
    ('sarahjohnson','sarahjohnson@example.com','$2b$10$/VB80DzhPX60iW6mKe3i/uVWwiHiJWbUY1A60W4Rrz4ni3V7GMvJm',     0, NULL),
    ('danielcarter','danielcarter@example.com','$2b$10$74BpX/bKJA2PXhXXhcheEuWQ.JyEE/ftYecJai1Kn3mc4lnoGhYr.',     0, NULL),
    ('lindagarcia', 'lindagarcia@example.com', '$2b$10$ZydmeFTIFROjQxI3ig5Ce.IOejlGYTcgqHC6J7FqYaL//OZLRijuu',     0, NULL),
    ('roberttaylor','roberttaylor@example.com','$2b$10$7.4Pt14UFjfsEV38dmSWfO5OsE3pFCycGf8YfRMd.UhPc.7iJ6UU.',     0, NULL),
    ('karenwhite',  'karenwhite@example.com',  '$2b$10$PgzPnZHRhgDfkla3c2OqFOv.jtwVRPR13cmJuP92sgU4dd828g9Na',    0, NULL),
    ('peterparker', 'peterparker@example.com', '$2b$10$l619IVIQRvxndoihhNCRgO0JIMfsOndXqK1/.NhtPPV1x8JjlrQRi',    0, NULL);

INSERT INTO Events (name, description, date, createdBy, deletedAt)
VALUES
    ('New Year Celebration',  'Kick off the new year with fun and fireworks', '2025-01-01 20:00:00',  2,  NULL),  -- createdBy johnsmith (id=2)
    ('Valentine''s Day Party','Romantic-themed party with live music',        '2025-02-14 19:00:00',  3,  NULL),  -- createdBy janedoe   (id=3)
    ('Spring Festival',       'Celebrating the bloom of spring',             '2025-03-21 10:00:00',  4,  NULL),  -- createdBy mikebrown (id=4)
    ('Summer Beach Bash',     'Fun in the sun with volleyball and BBQ',      '2025-06-20 15:00:00',  5,  NULL),  -- createdBy emilyclark (id=5)
    ('Concert Night',         'Live band performances and DJ sets',          '2025-07-10 18:30:00',  6,  NULL),  -- createdBy davidmiller (id=6)
    ('Tech Conference',       'Latest innovations in the tech world',        '2025-08-05 09:00:00',  7,  NULL),  -- createdBy sarahjohnson (id=7)
    ('Startup Pitch',         'Entrepreneurs presenting new business ideas', '2025-09-12 14:00:00',  8,  NULL),  -- createdBy danielcarter (id=8)
    ('Board Game Night',      'Tabletop games and tournaments',              '2025-10-01 17:00:00',  9,  NULL),  -- createdBy lindagarcia (id=9)
    ('Art Exhibition',        'Display of modern and classical art pieces',  '2025-11-15 11:00:00', 10,  NULL),  -- createdBy roberttaylor (id=10)
    ('Cooking Workshop',      'Learn to cook gourmet meals from experts',    '2025-12-02 16:00:00', 11,  NULL),  -- createdBy karenwhite   (id=11)
    ('Halloween Party',       'Costume contest and pumpkin carving',         '2025-10-31 20:00:00', 12,  NULL),  -- createdBy peterparker  (id=12)
    ('Christmas Gala',        'Formal gathering with dinner and dancing',    '2025-12-25 19:00:00',  2,  NULL); -- createdBy johnsmith (id=2 again)

INSERT INTO Participations (userId, eventId, comment, registrationDate, deletedAt)
VALUES
    -- Event 1: New Year Celebration
    (3,  1, 'Excited to celebrate!',           '2024-12-20 10:00:00', NULL),
    (4,  1, 'Bringing some fireworks.',        '2024-12-21 11:00:00', NULL),
    (5,  1, 'Party hats are on me!',           '2024-12-22 09:00:00', NULL),

    -- Event 2: Valentine's Day Party
    (2,  2, 'Looking for a fun evening!',      '2025-01-15 12:00:00', NULL),
    (6,  2, 'Hoping to meet new people.',      '2025-01-20 13:00:00', NULL),
    (7,  2, 'Can’t wait for the live music!',  '2025-01-25 15:00:00', NULL),

    -- Event 3: Spring Festival
    (2,  3, 'Spring is my favorite season!',   '2025-03-01 09:30:00', NULL),
    (8,  3, 'Will bring fresh flowers.',       '2025-03-02 10:00:00', NULL),
    (6,  3, 'Love the warm weather!',          '2025-03-05 11:00:00', NULL),

    -- Event 4: Summer Beach Bash
    (3,  4, 'Beach volley is on!',            '2025-06-10 08:00:00', NULL),
    (9,  4, 'Bringing sunscreen.',             '2025-06-11 09:15:00', NULL),
    (1,  4, 'Admin dropping by for a check.',  '2025-06-12 07:45:00', NULL),

    -- Event 5: Concert Night
    (4,  5, 'Huge music fan here!',           '2025-06-30 16:00:00', NULL),
    (5,  5, 'Can’t wait for the DJ sets.',     '2025-07-01 12:30:00', NULL),
    (10, 5, 'Looking forward to the live band','2025-07-02 14:00:00', NULL),

    -- Event 6: Tech Conference
    (5,  6, 'Love learning new tech trends!',  '2025-07-20 09:00:00', NULL),
    (7,  6, 'Hoping to network.',             '2025-07-22 10:00:00', NULL),
    (11, 6, 'Might present something.',        '2025-07-25 08:30:00', NULL),

    -- Event 7: Startup Pitch
    (2,  7, 'Pitching my new idea.',          '2025-08-01 13:00:00', NULL),
    (9,  7, 'Excited to see new concepts.',    '2025-08-02 14:10:00', NULL),
    (5,  7, 'Looking for investment opps.',    '2025-08-03 15:15:00', NULL),

    -- Event 8: Board Game Night
    (3,  8, 'Settlers of Catan pro here!',    '2025-09-15 16:45:00', NULL),
    (8,  8, 'Bringing my own board games.',    '2025-09-16 17:00:00', NULL),
    (10, 8, 'Let’s have a fun night!',         '2025-09-17 18:30:00', NULL),

    -- Event 9: Art Exhibition
    (4,  9, 'Appreciate modern art a lot.',   '2025-10-10 13:00:00', NULL),
    (7,  9, 'Hope to see some sculpture.',     '2025-10-11 14:00:00', NULL),
    (12, 9, 'Bringing friends along!',         '2025-10-12 15:00:00', NULL),

    -- Event 10: Cooking Workshop
    (3, 10, 'I love cooking!',                 '2025-11-01 09:30:00', NULL),
    (11,10, 'Interested in vegan recipes.',    '2025-11-01 10:45:00', NULL),
    (1, 10, 'Admin will sample the dishes.',   '2025-11-01 11:00:00', NULL),

    -- Event 11: Halloween Party
    (9,  11, 'Dressing up as a witch.',        '2025-10-20 19:00:00', NULL),
    (10, 11, 'Ghost costume ready!',           '2025-10-21 20:00:00', NULL),
    (2,  11, 'Pumpkin carving is my jam!',     '2025-10-22 21:00:00', NULL),

    -- Event 12: Christmas Gala
    (4,  12, 'Formal attire on point.',        '2025-12-10 14:00:00', NULL),
    (11, 12, 'Planning the decorations.',      '2025-12-11 14:15:00', NULL),
    (3,  12, 'Ready for the holiday spirit.',  '2025-12-12 14:30:00', NULL);
