admin = User.create!(name: "Admin User", username: "admin_user", email: "admin@z.com", password: "password")

puts "seeded #{User.count} users"
