// LESSON 01: The Mouth That Counted the Universe
// Genesis Division — 15 Characters
// 一二三四五六七八九十口日月田目

VAR bound_count = 0
VAR current_char = ""

-> start

=== start ===
The file lands on your desk with a sound like distant thunder.

You are new to the Ministry. The intake clerk barely glanced at you before stamping your orientation papers and pointing toward the Genesis Division.

"First case," she had said. "Something's been counting itself into existence. We need you to bind it before it finishes."

The file is warm to the touch. The label reads:

_案件 #001: 創世紀事_
_Genesis Incident_

+ [Open the file]
    -> open_file
+ [Examine the exterior first]
    -> examine_exterior

=== examine_exterior ===
The file is older than it should be. The edges are worn, the paper yellowed, though the intake stamp is fresh.

Someone has written in the margin, in faded ink:

_"In the beginning, there was nothing but a single horizontal line."_

The words seem to glow faintly.

+ [Open the file]
    -> open_file

=== open_file ===
The file opens.

Inside, you find not paper but *void* — an absence so complete it has weight. And floating in that void, a single horizontal line.

It hums.

It vibrates.

It is utterly, impossibly *alone*.

-> encounter_one

=== encounter_one ===
The line speaks without a mouth. # CHAR: 一 # PINYIN: yī # MEANING: one

【一】

"I am *ONE*," it says, and its voice sounds like the first note ever sung. "I was here before counting existed. I *made* counting exist."

The sound reverberates through the void: *"Yeeee!"* — high, singular, proud.

This is the spirit of ONE. To bind it, you must acknowledge its nature.

+ [Speak its name: "yī"]
    -> bind_one
+ [Ask: "Why are you alone?"]
    -> question_one

=== question_one ===
The line trembles.

"Alone? I am not alone. I am *complete*. I am the foundation upon which all numbers will stand."

It pauses.

"But... it does get quiet here. In the nothing."

+ [Speak its name: "yī"]
    -> bind_one

=== bind_one ===
You shape your mouth. First tone. High and level.

"Yī."

The spirit shudders. It *recognizes itself* in your voice.

~ bound_count = bound_count + 1
~ current_char = "一"

A warmth spreads through your chest. The character settles into your mind — a single proud line, singing its eternal note.

_一 = one = yī_

The void shifts. The loneliness of ONE has been heard. And now, as if in response—

Another line appears.

-> encounter_two

=== encounter_two ===
# CHAR: 二
# PINYIN: èr
# MEANING: two

【二】

Two parallel lines float in the darkness. They stack up, one above the other, like steps leading somewhere.

"*ERR!*" they shout in unison — sharp, declarative. "We are *TWO*. We are company. We are the first conversation."

+ [Speak: "èr"]
    -> bind_two
+ [Watch them interact]
    -> watch_two

=== watch_two ===
The two lines argue.

"I was here first," says the top line.
"You were nothing without me," says the bottom.

They are inseparable. They are *relationship*. They are the moment loneliness ended.

+ [Speak: "èr"]
    -> bind_two

=== bind_two ===
"Èr."

The fourth tone. Sharp and falling, like a declaration.

~ bound_count = bound_count + 1
~ current_char = "二"

The TWO spirits calm. They recognize their name. They settle into your memory — two lines, stacked, no longer arguing.

_二 = two = èr_

But if two can exist... why not more?

A third line materializes.

-> encounter_three

=== encounter_three ===
# CHAR: 三
# PINYIN: sān
# MEANING: three

【三】

Three horizontal lines rise like stairs, like a ladder into possibility.

They sing together: *"Saaaan-shine!"* — the word stretching upward, harmonious, complete.

【三】

"We are *THREE*," they chorus. "We are crowd. We are the first song with harmony."

+ [Speak: "sān"]
    -> bind_three

=== bind_three ===
"Sān."

First tone. High and steady, like the top step of a stair.

~ bound_count = bound_count + 1
~ current_char = "三"

The THREE spirits align. They hum in perfect thirds. They become memory.

_三 = three = sān_

The void is no longer empty. Numbers are being born. And now—

Something *encloses*.

-> encounter_four

=== encounter_four ===
# CHAR: 四
# PINYIN: sì
# MEANING: four

【四】

A box forms in the darkness. Inside it, shapes move — the first container, the first boundary.

"Sì!"* — the sound is sharp, commanding. "See this! See what is *contained*!"

"We are *FOUR*," the box declares. "We are the first room. The first limit. The first *inside*."

+ [Speak: "sì"]
    -> bind_four

=== bind_four ===
"Sì."

Fourth tone. Sharp and final, like a door closing.

~ bound_count = bound_count + 1
~ current_char = "四"

The FOUR spirit settles. The first box. The first boundary. Yours now.

_四 = four = sì_

Inside the box, something crosses.

-> encounter_five

=== encounter_five ===
# CHAR: 五
# PINYIN: wǔ
# MEANING: five

【五】

Five strokes converge at a crossing point — a meeting place at the center of everything.

"Woo!"* it calls, a sound that rises and falls like a question answered.

"I am *FIVE*," says the crossing. "I am the center. I am where the lines meet. I am *balance*."

+ [Speak: "wǔ"]
    -> bind_five

=== bind_five ===
"Wǔ."

Third tone. The dipping tone. Down and up, like finding your footing.

~ bound_count = bound_count + 1
~ current_char = "五"

The FIVE spirit centers itself in your mind. The crossroads. The meeting point.

_五 = five = wǔ_

Something covers the eight that hasn't arrived yet—

-> encounter_six

=== encounter_six ===
# CHAR: 六
# PINYIN: liù
# MEANING: six

【六】

A lid descends over diverging paths. Eight hides beneath, but six appears above.

"Leo!"* it shouts — for six sharp reasons that defy explanation.

"I am *SIX*," says the covered thing. "I am what happens when you put a roof over chaos."

+ [Speak: "liù"]
    -> bind_six

=== bind_six ===
"Liù."

Fourth tone. Sharp, decisive.

~ bound_count = bound_count + 1
~ current_char = "六"

SIX settles. A lid over possibility.

_六 = six = liù_

A slash cuts across the void—

-> encounter_seven

=== encounter_seven ===
# CHAR: 七
# PINYIN: qī
# MEANING: seven

【七】

Seven children draw slashes across the night sky with sparklers, leaving trails of light.

"Chee!"* they cry — the sound of celebration.

"We are *SEVEN*," they laugh. "We are the lucky cut. The slash that divides perfectly."

+ [Speak: "qī"]
    -> bind_seven

=== bind_seven ===
"Qī."

First tone. High and bright, like children's laughter.

~ bound_count = bound_count + 1
~ current_char = "七"

SEVEN blazes into memory.

_七 = seven = qī_

Paths diverge—

-> encounter_eight

=== encounter_eight ===
# CHAR: 八
# PINYIN: bā
# MEANING: eight

【八】

Two strokes spread like wings, like paths diverging, like separation and possibility.

"Baaaa!"* — the call of something dividing.

"I am *EIGHT*," says the split. "I am the choice. I am the fork in the road. I am what happens when one becomes two becomes *many*."

+ [Speak: "bā"]
    -> bind_eight

=== bind_eight ===
"Bā."

First tone. Open and spreading.

~ bound_count = bound_count + 1
~ current_char = "八"

EIGHT spreads into memory. Divergence. Possibility.

_八 = eight = bā_

Something curves—

-> encounter_nine

=== encounter_nine ===
# CHAR: 九
# PINYIN: jiǔ
# MEANING: nine

【九】

A curving hook bends like a question mark, like something almost complete.

"Jiǔ..."* it whispers — the sound rising and falling uncertainly.

"I am *NINE*," says the hook. "I am almost. I am *nearly there*. I am the step before completion."

+ [Speak: "jiǔ"]
    -> bind_nine

=== bind_nine ===
"Jiǔ."

Third tone. Dipping, questioning, almost there.

~ bound_count = bound_count + 1
~ current_char = "九"

NINE hooks into memory. The almost. The nearly.

_九 = nine = jiǔ_

And then—

A cross marks the spot.

-> encounter_ten

=== encounter_ten ===
# CHAR: 十
# PINYIN: shí
# MEANING: ten

【十】

A perfect cross. Horizontal meets vertical. The count is complete.

"Shí?"* it asks — rising, questioning, surprised by its own existence. "Why ten? Why here? Why *complete*?"

"I am *TEN*," says the cross. "I am the end of counting. I am the beginning of counting again. I am the cycle."

+ [Speak: "shí"]
    -> bind_ten

=== bind_ten ===
"Shí."

Second tone. Rising. Curious. Complete.

~ bound_count = bound_count + 1
~ current_char = "十"

TEN crosses into memory. The completion. The new beginning.

_十 = ten = shí_

The universe has counted itself into existence.

But who was counting?

-> encounter_mouth

=== encounter_mouth ===
# CHAR: 口
# PINYIN: kǒu
# MEANING: mouth

【口】

A perfect square opens in the void.

It is a *MOUTH*.

"Kǒu..."* it speaks — and the word comes from *within* the shape. Clearly spoken through parted lips.

"I am *MOUTH*," it says. "I spoke the numbers. I counted the universe into being. I am the first word."

+ [Speak: "kǒu"]
    -> bind_mouth

=== bind_mouth ===
"Kǒu."

Third tone. Dipping, like a mouth closing and opening.

~ bound_count = bound_count + 1
~ current_char = "口"

The MOUTH settles. The First Speaker. Yours.

_口 = mouth = kǒu_

The MOUTH looks up—

-> encounter_day

=== encounter_day ===
# CHAR: 日
# PINYIN: rì
# MEANING: day / sun

【日】

The MOUTH looks up and sees a window to the blazing sun.

"REE!"* — the sun yells sharply to wake everything that now exists.

"I am *DAY*," says the sun-window. "I am the first light. The first heat. The first *time*."

+ [Speak: "rì"]
    -> bind_day

=== bind_day ===
"Rì."

Fourth tone. Sharp, like sunlight.

~ bound_count = bound_count + 1
~ current_char = "日"

DAY blazes into memory.

_日 = day/sun = rì_

The MOUTH looks to the side—

-> encounter_month

=== encounter_month ===
# CHAR: 月
# PINYIN: yuè
# MEANING: month / moon

【月】

A crescent appears. Softer than the sun. Patient.

"Yuè..."* it whispers as each month turns.

"I am *MONTH*," says the crescent moon. "I am the slower count. The gentler time. The mark of passages."

+ [Speak: "yuè"]
    -> bind_month

=== bind_month ===
"Yuè."

Fourth tone. Gentle but definite.

~ bound_count = bound_count + 1
~ current_char = "月"

MONTH settles into memory. The patient counter.

_月 = month/moon = yuè_

The MOUTH looks down—

-> encounter_field

=== encounter_field ===
# CHAR: 田
# PINYIN: tián
# MEANING: rice field

【田】

Below, a grid appears. A perfect division of land. The first agriculture.

"Tián?"* the field asks — rising, muddy, curious. "Why so divided? Why so *contained*?"

"I am *RICE FIELD*," says the grid. "I am where food comes from. I am the first cultivation. I am *civilization*."

+ [Speak: "tián"]
    -> bind_field

=== bind_field ===
"Tián."

Second tone. Rising from the earth.

~ bound_count = bound_count + 1
~ current_char = "田"

RICE FIELD settles. The grid. The cultivation.

_田 = rice field = tián_

And reflected in the water of the field—

-> encounter_eye

=== encounter_eye ===
# CHAR: 目
# PINYIN: mù
# MEANING: eye

【目】

In the flooded paddies, a reflection stares back.

It is an *EYE*.

"MOO!"* it yells sharply — startled, seeing itself for the first time.

"I am *EYE*," says the reflection. "I see what was counted. I witness what was spoken. I am *awareness*."

+ [Speak: "mù"]
    -> bind_eye

=== bind_eye ===
"Mù."

Fourth tone. Sharp and seeing.

~ bound_count = bound_count + 1
~ current_char = "目"

The EYE settles. The Witness. The one who sees all that Genesis created.

_目 = eye = mù_

-> case_complete

=== case_complete ===
The void collapses.

You find yourself back at your desk in the Ministry. The file is closed. Your hands are steady.

Inside you, fifteen spirits hum quietly:

_一二三四五六七八九十口日月田目_

They are bound. They are yours. They are the first lesson of Genesis.

The intake clerk appears at your door.

"Case closed?" she asks.

You nod.

"Good. Case Two is waiting." She pauses. "The Ancient Singer of Dawn. Genesis Division."

She slides another file onto your desk.

But that is a story for another day.

_案件 #001 — 結案_
_Case #001 — Closed_

-> END
