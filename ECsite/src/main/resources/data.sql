-- ユーザーデータ（ハッシュ化されたパスワードを使用）
INSERT INTO users (email, password, verified, name, address, phone_number, gender) 
VALUES 
('testuser@example.com', '$2a$10$Z1rD1Xe2DOjjj', TRUE, 'Test User', 'Tokyo, Japan', '080-1234-5678', 'male'),
('alice@example.com', '$2a$10$Z1rD1Xe2DOkkk', FALSE, 'Alice', 'Osaka, Japan', '080-5678-1234', 'female');

-- 商品データ（画像のURLも追加）
INSERT INTO products (name, price, description, image_url) 
VALUES 
('Tシャツ', 2500, 'シンプルな白いTシャツ', 'img/image01.jpg'),
('スニーカー', 8000, '快適な履き心地のスニーカー', 'img/image02.jpg'),
('Tシャツ', 2500, 'シンプルな白いTシャツ', 'img/image01.jpg'),
('Tシャツ', 2500, 'シンプルな白いTシャツ', 'img/image01.jpg'),
('Tシャツ', 2500, 'シンプルな白いTシャツ', 'img/image01.jpg'),
('Tシャツ', 2500, 'シンプルな白いTシャツ', 'img/image01.jpg'),
('Tシャツ', 2500, 'シンプルな白いTシャツ', 'img/image01.jpg'),
('Tシャツ', 2500, 'シンプルな白いTシャツ', 'img/image01.jpg'),
('Tシャツ', 2500, 'シンプルな白いTシャツ', 'img/image01.jpg'),
('Tシャツ', 2500, 'シンプルな白いTシャツ', 'img/image01.jpg'),
('Tシャツ', 2500, 'シンプルな白いTシャツ', 'img/image01.jpg'),
('Tシャツ', 2500, 'シンプルな白いTシャツ', 'img/image01.jpg'),
('リュック', 4500, '通勤・通学に最適なリュック', 'img/image03.jpg');
