-- Seed data for Club Correcaminos members
-- Source: Fillout form submissions (Jan-Feb 2026)
-- Cleaned: names title-cased, times normalized to HH:MM:SS / MM:SS,
--          duplicates merged (kept most recent/complete submission),
--          nicknames separated from legal names

INSERT INTO members (
  full_name, date_of_birth, year_joined, email, phone,
  instagram, strava, total_marathons, marathon_pr, marathon_pr_year,
  marathon_pr_city, boston_count, half_marathon_pr, ten_k_pr,
  sub3_marathons, most_run_marathon, marathon_cities, other_marathon_cities,
  bio, photo_url, photo_authorized
) VALUES

-- Pedro Ortiz (merged 2 submissions, kept newer data from Feb 1)
(
  'Pedro Ortiz',
  '1960-07-08', NULL, 'portizmsd@gmail.com', '+528181700320',
  NULL, NULL, 28, '3:45:00', 2006,
  'Austin Marathon', 1, '1:45:00', '48:50',
  0, 'Berlin Marathon', NULL,
  'Boston, New York, Chicago, Austin, San Francisco, Big Sur, Venecia, Bejing, etc.',
  'Agradezco mucho ser parte de este Club y admiro a muchos de mis compañeros. Me siento orgulloso de haber corrido los 28 Maratones que hasta hoy llevo y haberlos corrido!',
  NULL, false
),

-- Daniela Alejandra Leva Pelaez
(
  'Daniela Alejandra Leva Pelaez',
  '1985-09-27', 2026, 'danielaleva.p@gmail.com', '+528116114691',
  '@danilevap', 'Daniela Leva', 3, '4:11:01', 2025,
  'Sydney Marathon', 0, NULL, NULL,
  0, 'New York City Marathon',
  ARRAY['New York City Marathon', 'Sydney Marathon'],
  'Milan',
  NULL, NULL, true
),

-- Juan M. Elizondo
(
  'Juan M. Elizondo',
  '1961-12-26', 1997, 'jelizondo@oselmail.com', '+528183413161',
  NULL, NULL, 111, '3:16:00', 2000,
  'Chicago Marathon', 25, NULL, '40:50',
  0, 'Boston Marathon',
  ARRAY['Boston Marathon', 'Chicago Marathon', 'Paris Marathon', 'London Marathon', 'Berlin Marathon', 'Barcelona Marathon', 'Monterrey Marathon', 'Los Angeles Marathon', 'Houston Marathon', 'Austin Marathon', 'Dallas Marathon', 'Miami Marathon', 'Marine Corps Marathon', 'Philadelphia Marathon', 'Twin Cities Marathon', 'Toronto Waterfront Marathon'],
  'Mont St Michel, Vienna',
  NULL, 'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/bbf51d21-4688-4cee-9f71-a5af300fb5a1-IrHe8vZVPVQ7sCud2oOkHrOIXdyjekfd7b7vc4AInplUuEgdSyjYqMZEXckE3GH2cv4nsBp6k9pfiKM888YOggwYEdQMkrLMnTn/Juan-Elizondo-sesioIn-familiar-1820.jpg', true
),

-- Rosendo de Jesus Garcia Sada
(
  'Rosendo de Jesus Garcia Sada',
  '1977-12-19', 2026, 'rgarcia@apce.mx', '+528281227840',
  '@rosendogs', 'Rosendo Garcia Sada', 17, '3:30:41', 2026,
  'Houston Marathon', 0, '1:40:13', '44:09',
  2, 'Sydney Marathon', NULL, NULL,
  NULL, 'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/04fbbbf8-2b9e-4e38-b0e7-b28240e6308c-c4Q1GvtcvwGv92FVXJwq9byInBrAnlmqt4VHSb23mP9Kmd9WMdA3tiak3mmkah8IQu82GUHoCuZipNIznL5I9x3MXNKoCcVO2VN/IMG_3468.jpg', true
),

-- Jaime Blanco
(
  'Jaime Blanco',
  '1966-09-20', 2008, 'jblanco1927@gmail.com', '+528122100322',
  'Jblancodelprado', NULL, 15, '3:11:54', 2000,
  'Hartford Marathon', 0, '1:32:00', '39:00',
  0, 'Chicago Marathon', NULL,
  'Miami, Hartford, Cocoa Beach, San Antonio',
  'Ser parte de este grupo es saber que cada paso refleja nuestros valores: amistad, respeto, compromiso y alegría por el deporte',
  NULL, false
),

-- Juan Vargas Rodriguez
(
  'Juan Vargas Rodriguez',
  '1965-01-03', 2008, 'jvargass65@gmail.com', '+528112779040',
  NULL, 'Juan Vargas - JV007', 55, '3:23:00', 2013,
  'Chicago Marathon', 5, '1:45:00', '48:00',
  0, 'Houston Marathon', NULL, NULL,
  NULL, 'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/dbd4bbb6-520c-4b21-a485-54977099cac0-rxSUbHtg9RFbpXEmTLpuZ6VebZkCWJ5S2SeqZex2rCdERYymGGVKuneqVvIs4imC3U679eskyhwe4OL7AXsgdbbl88E3eMcsKZK/FotoJV_01.jpg', true
),

-- Juan Felix Rodriguez
(
  'Juan Felix Rodriguez',
  '1949-01-01', 1985, 'jfrodriguez@me.com', '+528180294371',
  '@juanfelixrodri', '@juanfelixrodri', 20, '3:46:00', 2012,
  'Austin Marathon', 0, '1:45:00', '42:00',
  0, 'Monterrey Marathon', NULL, NULL,
  NULL, NULL, false
),

-- Gonzalo Blanco Hernandez
(
  'Gonzalo Blanco Hernandez',
  '1963-09-12', 2001, 'gonzbh@gmail.com', '+528119772952',
  NULL, NULL, 25, '4:48:00', NULL,
  'Monterrey Marathon', 0, '2:02:00', '55:30',
  0, 'New York City Marathon',
  ARRAY['New York City Marathon', 'Chicago Marathon', 'Monterrey Marathon', 'Austin Marathon', 'Marine Corps Marathon'],
  'El Paso, The Hamptons',
  NULL, NULL, false
),

-- Luis Alvarez
(
  'Luis Alvarez',
  '1962-05-15', 1986, 'lalvarez@aloymex.com', '+525554553686',
  '@LuisAlvarezIRONMAN', NULL, 246, '3:32:00', 2005,
  NULL, 0, '1:37:00', '40:40',
  0, NULL, NULL, NULL,
  'Les podría decir que soy quien soy gracias al CLUB Correcaminos y a sus integrantes, ustedes me enseñaron la pasión por el deporte, la disciplina y el goce que es hacer ejercicio, y la gran fraternidad, que puede salir de una simple corrida dominguera. Estoy muy agradecido y orgulloso de ser Correcaminos de MTY.',
  'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/70da6ea9-ea14-4c99-bae8-c447777dd1c8-OBu0ahrRq4iNEuB4VJ0FH4WbAcYOklv4gP9zhQL6SZD26MgAHN8taiUEyMqgbLgkl35WnW9q7WQPBe8MecBPCRvu1NP9Q85rnVz/IMG_4967.jpg', false
),

-- Juan Francisco Gonzalez Lopez
(
  'Juan Francisco Gonzalez Lopez',
  '1953-10-19', 2002, 'sanpaco53@gmail.com', '+528110778530',
  '@sanpaco53', NULL, 35, '3:46:00', 2003,
  'Austin Marathon', 5, '1:36:00', '46:05',
  0, 'Monterrey Marathon', NULL,
  'Chicago, Nueva York, Dallas, Minneapolis, Malaga, Torreon',
  '4 hijos: Ivan, Ciro, Pamela y Martha Sofia. Esposa Martha Peña. Todos hemos hecho medios maratones y 3 maratones completos. Presidente de Correcaminos en la década de los 2000.',
  'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/0622748c-bef6-4725-971b-d9a4cf7238c6-HovNzQtxxMF27idn962O0NXdDG3oj4ciFcD287jlpGgNlQpnUzGLV2Fll2LJAF7ZoXdxIbN319CGMoAzYPM86k3aVSJeZeMkzym/20251019_074603.jpg', true
),

-- Armando Silveyra Sr.
(
  'Armando Silveyra Sr.',
  '1958-08-30', 2003, 'armando.silveyra@gmail.com', '+15122470423',
  NULL, NULL, 14, '3:27:00', 2009,
  'Dallas Marathon', 2, '1:40:00', '46:00',
  0, 'Austin Marathon', NULL,
  'Dallas, Monterrey, Houston',
  'La inercia del Club motiva.',
  'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/c7944498-00c3-476e-9155-5a7fa0dd2aae-wJSUZ8ED5KRSGsjZhk4sBL6RCPRZAsq7xdVOU3OCXTqJgAIl8vRoYhkvS2hf12gNHhdVJLelmNv3oXlTmchtcXSdKSkHvyBYA6A/IMG_6880.jpg', true
),

-- Jose Luis Bejarano Vela
(
  'Jose Luis Bejarano Vela',
  '1951-08-07', NULL, 'jlb0807@hotmail.com', '+528116070679',
  'Velajoseluisbejarano', NULL, 36, '3:52:00', NULL,
  'Houston Marathon', 0, '1:52:00', '48:00',
  0, 'Houston Marathon',
  ARRAY['New York City Marathon', 'Chicago Marathon', 'Monterrey Marathon', 'Houston Marathon', 'Austin Marathon', 'Dallas Marathon', 'Marine Corps Marathon', 'Twin Cities Marathon'],
  NULL,
  NULL, NULL, false
),

-- Mariano Montero Zubillaga
(
  'Mariano Montero Zubillaga',
  '1951-03-29', 1984, 'marianomonteroz@gmail.com', '+528128618341',
  NULL, NULL, 3, '3:28:00', 1987,
  NULL, 0, '1:24:00', '38:00',
  0, 'San Antonio', NULL, NULL,
  NULL, 'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/923168b9-9521-45f0-b568-07305972e7e0-Kl4GVSzVhJUJmeHXJjNjwl11cr9yI9QTu3GLyZ6nmkojrijw2z0vd0fzCWcmLXW2XKs4Kr1saxRah8Nf1ufRjB5uxZdtbrfZpV7/IMG_4993.jpg', true
),

-- Fernando de los Santos Salazar
(
  'Fernando de los Santos Salazar',
  '1957-03-03', 1990, 'fdeloss@yahoo.com', '+528115458456',
  '@fernandodelosantos', NULL, 27, '3:57:00', 1997,
  'San Antonio', 0, NULL, NULL,
  3, 'Monterrey Marathon',
  ARRAY['Chicago Marathon', 'Twin Cities Marathon', 'Dallas Marathon', 'Austin Marathon', 'Monterrey Marathon'],
  'Lala, Tangamanga y San Antonio',
  NULL, 'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/97dab5f2-cf2a-4ce5-8e82-178040bff617-itoRdqUhATqzG4bpWLWwM6UasXbW8QfdMAxJk0j8VejsoEWAlkIckVLWnaowLYhMtXhOvqHFAZv9VRrMSJhLht8N0ThLQOAmGg1/IMG_5111.jpg', true
),

-- Sandra Ofelia Garza Gonzalez
(
  'Sandra Ofelia Garza Gonzalez',
  '1968-09-30', 2011, 'sandra.garza@tec.mx', '+528111306551',
  '@sandragarzagonzalez', NULL, 36, '3:34:00', 2014,
  'Boston Marathon', 11, '1:40:00', '45:31',
  0, 'Boston Marathon', NULL,
  'Brownsville Marathon, Harlingen Marathon y Maraton del Sur de Texas',
  NULL, 'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/997b15c5-8ea3-44b5-b562-8c0fb4ade76a-PhpZ1LyvufpDY6V1lhjS6PPi9RMs4eChV8RZ4ZEfW9WkzQFYQd1UYmAAYPkeaBMstSRtnychS64hIGL4uQXpR6e6l2TssEylOZY/IMG_9761.jpg', true
),

-- Armando Silveyra Jr.
(
  'Armando Silveyra Jr.',
  '1988-07-25', 2003, 'a_silveyra@hotmail.com', '+528117993030',
  'a.silveyra88', 'https://www.strava.com/athletes/44903252', 18, '2:57:51', 2013,
  'Chicago Marathon', 1, '1:23:11', '35:42',
  1, 'Monterrey Marathon',
  ARRAY['Boston Marathon', 'New York City Marathon', 'Chicago Marathon', 'Monterrey Marathon', 'Houston Marathon', 'Austin Marathon'],
  'New Orleans, Edmonton',
  'Excelente grupo de amigos, con corredores excepcionales, y grandes ejemplos a seguir!',
  'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/9a1d0473-3483-4561-b34c-953aebe72c64-BEzL2zBCjtBlMDB1j6fEgQBAmDlrObc4QhWwUX4Aa3TVFyRpG8iviOlvzSEW9y0uVVvHAZF69AHKNZBoYe7zt7UuZaHccJ57mqa/WhatsApp-Image-2026-01-30-at-4.20.52-PM.jpg', true
),

-- Luis Roberto Elizondo Gonzalez (merged 2 submissions, kept newer/more complete)
(
  'Luis Roberto Elizondo Gonzalez',
  '1958-09-03', 2013, 'luis.elizondo.gzz@gmail.com', '+528110504295',
  '@luisrelizindog', 'luisrelizondo', 32, '3:49:19', 2022,
  'Houston Marathon', 2, '1:49:24', '47:46',
  0, 'Houston Marathon',
  ARRAY['Chicago Marathon', 'Boston Marathon', 'Monterrey Marathon', 'Austin Marathon', 'Dallas Marathon', 'Twin Cities Marathon', 'Philadelphia Marathon', 'Toronto Waterfront Marathon'],
  'San Antonio TX, Isla del Padre TX, Brownsville TX, Tucson AZ, Torreon Coah, Washington DC, Woodlands TX, Las Vegas NV',
  'Muy feliz y agradecido de pertenecer al Club Correcaminos de Monterrey, porque me ha dado tesoros invaluables en amistades, logros deportivos y experiencias compartidas.',
  'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/864625b1-173e-4dbb-8ee9-1bfaf1586c2c-Q2o0ncMj1WU2oEQDFIrHjac2Uyeol3ry5JUnYQbIjYoY4s1ur5Up5OmRALYKbVT39PYKPAaWIHi4yBYQL5QrotJZGITs2NzIonv/584d2f38-da61-444c-be3a-380cf5cc2afe.jpg', true
),

-- Mohammad Azarang
(
  'Mohammad Azarang',
  '1957-04-07', 1994, 'mazarang@gmail.com', '+528183962696',
  NULL, NULL, 69, '3:25:19', 2001,
  'Houston Marathon', 0, NULL, NULL,
  0, NULL,
  ARRAY['Boston Marathon', 'Chicago Marathon', 'London Marathon', 'Mexico City Marathon', 'Monterrey Marathon', 'Los Angeles Marathon', 'Houston Marathon', 'Austin Marathon', 'Orlando Marathon', 'Marine Corps Marathon', 'Philadelphia Marathon', 'Twin Cities Marathon', 'Ottawa Marathon'],
  NULL,
  'He corrido un ultra-maraton de 80kms. En esa ocasion, corri 2 maratones un ultra y un medio maraton en un mismo mes.',
  'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/ddfef29c-f6b8-4e54-92c4-af439d7d4644-8BBoQz4k349lMC5XUx1PclsiOP0MAEJxVnsByh2YYse7WlkGYi60NjtNgLbNWNJs63fVI8zVngTXbJ6TyKUmc5ecITT0p00hwcj/Foto-MRAE.jpg', true
),

-- Miguel Ganem Morales
(
  'Miguel Ganem Morales',
  '1968-12-22', 2007, 'elmike68@gmail.com', '+528119993406',
  '@miguel.ganem', '@Miguel Ganem (Yeipro)', 9, '3:33:00', 2021,
  'Monterrey Marathon', 0, NULL, NULL,
  0, 'Monterrey Marathon',
  ARRAY['Chicago Marathon', 'Austin Marathon', 'Monterrey Marathon', 'Boston Marathon'],
  'San Antonio, San Diego',
  NULL, NULL, false
),

-- Alberto Adan Caballero Gomez
(
  'Alberto Adan Caballero Gomez',
  '1964-06-28', 2011, 'acaballero@tec.mx', '+528110444071',
  NULL, NULL, 50, '3:21:00', 2013,
  'Barcelona Marathon', 0, NULL, NULL,
  0, 'Monterrey Marathon', NULL, NULL,
  NULL, NULL, false
),

-- Eduardo Flores Lozano
(
  'Eduardo Flores Lozano',
  '1944-10-13', 1980, 'chapinflores@yahoo.com', '+528183624262',
  NULL, NULL, 15, '3:18:30', 1985,
  'San Antonio', 0, NULL, NULL,
  0, 'San Antonio',
  ARRAY['New York City Marathon', 'Paris Marathon', 'Dallas Marathon'],
  NULL,
  NULL, NULL, false
),

-- Carlos Barajas Cruz
(
  'Carlos Barajas Cruz',
  '1940-06-17', 1987, 'cbarajasc@yahoo.com.mx', '+528114135584',
  NULL, NULL, 75, '3:15:00', 1989,
  'Dallas White Rock', 0, NULL, NULL,
  0, 'Monterrey Marathon',
  ARRAY['New York City Marathon', 'Boston Marathon', 'Berlin Marathon', 'London Marathon', 'Chicago Marathon', 'Tokyo Marathon', 'Prague Marathon', 'Mexico City Marathon', 'Monterrey Marathon', 'Guadalajara Marathon', 'Los Angeles Marathon', 'San Francisco Marathon', 'Houston Marathon', 'Austin Marathon', 'Dallas Marathon', 'Marine Corps Marathon', 'Philadelphia Marathon', 'Twin Cities Marathon', 'Big Sur International Marathon', 'Cleveland Marathon'],
  'Guadalajara, SLP, Merida, Cancun, Seattle WA, San Antonio TX, Leon Gto, San Diego CA, San Pedro Super 80K, Torreon Coah, San Pedro Super 100K',
  'Tuve la oportunidad de organizar la Carrera de la Comunidad Terapeutica 10K por 5 años inaugurando la Ruta de Valle Oriente; durante casi 30 años he compartido mi experiencia a traves del Programa personalizado de Bioritmo Corporal (de mi desarrollo), con el cual 87 personas a la fecha, corrieron su 1er Maraton (hay varios Correcaminos), especialmente adultos mayores de 50 años. Siempre dispuesto a colaborar con quien me lo solicite. Mi ultimo Maraton ha sido el Powerade MTY 2025. Festeje mis 50 años corriendo 17 Maratones entre Enero y Diciembre de 1990.',
  'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/6f6e1ffb-f8aa-4cd6-8da7-2e096bd40d35-d0kv8MhUge87i10MbR9mqwtCGyZflWS6ojSr6MUcus65mCUzFsb1R5a6KIgDt2jgrIqcdhb9B6gacY0yw9B7zTYLChngUotS2O8/BERLIN-2011-18.jpg', true
),

-- Bernardo Lozano Elizondo (DOB was 2026-04-17 in form, clearly incorrect — set to NULL)
(
  'Bernardo Lozano Elizondo',
  NULL, 2013, 'blozanoe@hotmail.com', '+528111858444',
  '@blozanoe01', 'Bernardo Lozano', 5, '4:13:25', 2016,
  'Hamburg Marathon', 0, NULL, NULL,
  0, NULL,
  ARRAY['Chicago Marathon', 'Hamburg Marathon', 'Prague Marathon', 'Marine Corps Marathon', 'Budapest Marathon'],
  NULL,
  NULL, NULL, false
),

-- Armando Menchaca Vargas
(
  'Armando Menchaca Vargas',
  '1962-12-19', 2010, 'armando.menchacav@yahoo.com', '+528115440158',
  '@armandomenchacav', '@armandomenchaca', 34, '3:35:24', 2012,
  'Monterrey Marathon', 0, NULL, NULL,
  0, 'Monterrey Marathon',
  ARRAY['Boston Marathon', 'Monterrey Marathon'],
  'San Luis Potosi, Torreon, Woodlands TX',
  'Corri mi 1er maraton dias antes de cumplir 45 años. Corri un Ultra de 10 horas.',
  NULL, false
),

-- Rodolfo Cantu Stafford
(
  'Rodolfo Cantu Stafford',
  '1957-09-04', 1995, 'rodolfocantu@comcantu.com', '+528110073879',
  NULL, NULL, 7, '4:04:00', 1996,
  'Dallas Marathon', 0, NULL, NULL,
  0, 'Dallas Marathon', NULL,
  NULL,
  NULL, 'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/ce0d6467-b5c0-4629-9dbe-b9079099638b-6SW5aZJj9oPs9EK2tMS1pa8566Rs1j2enuwAqGHy5IhoSCPtwOAmd1xAAgxKOvjaSnYW62NzPhrFloE6Y5RTkwIS3T9MzwcaQOi/e710833b-5b20-4540-bcd8-4eaec2eb2e4c.jpg', true
),

-- Jaime Garcia Garciastorres
(
  'Jaime Garcia Garciastorres',
  '1966-08-24', 2000, 'jimmy99mex@gmail.com', '+528182809881',
  '@jaime_garcia', NULL, 16, '3:40:00', 2004,
  'Berlin Marathon', 0, NULL, NULL,
  0, 'Chicago Marathon',
  ARRAY['Boston Marathon', 'New York City Marathon', 'Mexico City Marathon', 'Chicago Marathon', 'Monterrey Marathon', 'Austin Marathon'],
  'Queretaro',
  'Excelente grupo de personas y amigos.',
  'https://prod-fillout-oregon-s3.s3.us-west-2.amazonaws.com/orgid-31465/flowpublicid-5zG5ySk2Jmus/1405d134-f62b-4ee4-a772-573601dcacf4-I6M4IUPrsxFyb5srQbPhdyrkNV13Ddy1SGVgg3afeSzyyr9dF80bPYIrTCy8hKwxB1HMzgW3CRJsEbQecGQ0XyZ9uhiJEKQoJ67/C1738215-4892-4449-B774-F86CFDFE5F4B.jpg', true
);
